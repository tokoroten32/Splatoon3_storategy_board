import requests
from bs4 import BeautifulSoup
import os
import time
from urllib.parse import urljoin, unquote
import re

# --- 設定項目 ---
TARGET_URL = "https://wikiwiki.jp/splatoon3mix/icon"
SAVE_DIR = r"D:\Splatoon__storategy\weapon_icons"  # 画像を保存するディレクトリ名 (raw文字列を推奨)
REQUEST_DELAY = 1  # 各リクエスト間の遅延時間（秒）
HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
CDN_BASE_URL_PATTERN = "https://cdn.wikiwiki.jp/to/w/splatoon3mix/icon/::ref/"
# --- 設定項目ここまで ---

def download_images_from_wiki():
    """
    指定されたwikiwiki.jpのページから画像をダウンロードします。
    """
    print(f"ターゲットURL: {TARGET_URL}")
    print(f"保存先ディレクトリ: {os.path.abspath(SAVE_DIR)}")
    print(f"リクエスト遅延: {REQUEST_DELAY}秒")
    print("-" * 30)
    print("重要: ウェブサイトの利用規約とrobots.txtを尊重し、著作権に注意してください。")
    print("サーバーに負荷をかけすぎないよう、リクエスト間隔を設けています。")
    print("-" * 30)

    # 保存先ディレクトリを作成
    if not os.path.exists(SAVE_DIR):
        try:
            os.makedirs(SAVE_DIR)
            print(f"ディレクトリ '{SAVE_DIR}' を作成しました。")
        except OSError as e:
            print(f"エラー: ディレクトリ '{SAVE_DIR}' の作成に失敗しました: {e}")
            return

    # HTMLコンテンツを取得
    try:
        print(f"URLからHTMLを取得中: {TARGET_URL} ...")
        response = requests.get(TARGET_URL, headers=HEADERS, timeout=30)
        response.raise_for_status()  # HTTPエラーがあれば例外を発生させる
        html_content = response.text
        print("HTMLの取得に成功しました。")
    except requests.exceptions.RequestException as e:
        print(f"エラー: URLの取得に失敗しました {TARGET_URL}: {e}")
        return

    # HTMLを解析
    soup = BeautifulSoup(html_content, 'html.parser')
    image_urls_and_names = []

    # wikiwiki.jpのアイコンページでは、画像は <div id="body"> (メインコンテンツ) 内の <img> タグで、
    # src属性が "?plugin=attach..." の形式になっていることが多い。
    page_body = soup.find('div', id='body') # メインコンテンツエリアのID 'body' を使用
    if not page_body:
        # div#body が見つからない場合、以前の div.contents も試す
        print("情報: div#body が見つかりませんでした。div.contents を試します。")
        page_body = soup.find('div', class_='contents')
        if not page_body:
            print("エラー: メインコンテンツエリア (div#body または div.contents) が見つかりませんでした。")
            print("ページの構造が変更された可能性があります。スクリプトのセレクタを確認してください。")
            return
    else:
        print("情報: メインコンテンツエリアとして div#body を使用します。")

    # --- デバッグ情報追加 ---
    all_img_tags_in_body = page_body.find_all('img')
    print(f"DEBUG: page_body ('div#body') 内で見つかった<img>タグの総数: {len(all_img_tags_in_body)}")

    if not all_img_tags_in_body and page_body: # page_bodyが存在する場合のみ内部を調査
        # page_body内にimgが見つからない場合、ページ全体のimgタグも調査
        all_img_tags_on_page = soup.find_all('img')
        print(f"DEBUG: page_body内にはimgタグがありませんでしたが、ページ全体で見つかった<img>タグの総数: {len(all_img_tags_on_page)}")
        if not all_img_tags_on_page:
            print("DEBUG: ページ全体でも<img>タグが見つかりませんでした。")
        else:
            print("DEBUG: ページ全体で見つかった最初の5つの<img>タグのsrc属性:")
            for i, img_tag in enumerate(all_img_tags_on_page[:5]):
                print(f"  - src: {img_tag.get('src')}")
    elif page_body: # page_bodyが存在し、imgタグも見つかった場合
        print(f"DEBUG: page_body ('div#body') 内で見つかった最初の5つの<img>タグのsrc属性:")
        for i, img_tag in enumerate(all_img_tags_in_body[:5]):
            print(f"  - src: {img_tag.get('src')}")
    # --- デバッグ情報追加ここまで ---

    found_images_count = 0
    for i, img_tag in enumerate(all_img_tags_in_body): # 既に取得済みのリストを使用
        src = img_tag.get('src')
        # DEBUG: 条件判定前のsrcを一部表示
        if src and src.startswith(CDN_BASE_URL_PATTERN):
            absolute_img_url = src # CDNのURLは既に絶対URL

            # ファイル名を抽出 (::ref/ の後から ? の前まで)
            try:
                filename_part = src.split(CDN_BASE_URL_PATTERN)[1] # "ファイル名.png?rev=..."
                filename_with_extension = filename_part.split('?')[0] # "ファイル名.png"
                filename = unquote(filename_with_extension) # URLデコード (念のため)
                image_urls_and_names.append({'url': absolute_img_url, 'filename': filename})
                found_images_count += 1
            except IndexError:
                print(f"警告: CDN URLの形式が予期しないものです。ファイル名を抽出できませんでした: {src}")
        elif src and 'wikiwiki.jp/to/w/common/image/face/' in src:
            # wikiwiki共通のフェイスマークなどは除外
            pass # print(f"DEBUG: wikiwiki共通画像のためスキップ: {src}")
        elif src:
            pass # if i < 20 : print(f"DEBUG: 条件に一致しないsrc [{i}]: {src}")

    if not image_urls_and_names:
        print("ダウンロード対象の画像が見つかりませんでした。")
        print("ページの構造が変更されたか、対象画像が存在しない可能性があります。")
        return

    print(f"{len(image_urls_and_names)} 件の画像URLを抽出しました。ダウンロードを開始します...")

    # 画像をダウンロード
    downloaded_count = 0
    skipped_count = 0
    for item in image_urls_and_names:
        img_url = item['url']
        original_filename = item['filename']

        # ファイル名に使えない文字をアンダースコアに置換
        safe_filename = re.sub(r'[\\/*?:"<>|]', "_", original_filename)
        filepath = os.path.join(SAVE_DIR, safe_filename)

        if os.path.exists(filepath):
            print(f"スキップ: '{safe_filename}' は既に存在します。")
            skipped_count +=1
            continue

        print(f"ダウンロード中: '{original_filename}' from {img_url} ...")
        try:
            img_response = requests.get(img_url, headers=HEADERS, stream=True, timeout=30)
            img_response.raise_for_status()
            with open(filepath, 'wb') as f:
                for chunk in img_response.iter_content(8192): # 8KBずつ読み込み
                    f.write(chunk)
            print(f"保存成功: {filepath}")
            downloaded_count += 1
        except requests.exceptions.RequestException as e:
            print(f"エラー: '{original_filename}' のダウンロードに失敗しました ({img_url}): {e}")
        except IOError as e:
            print(f"エラー: ファイル '{filepath}' の保存に失敗しました: {e}")
        
        # サーバーへの負荷を軽減するために待機
        time.sleep(REQUEST_DELAY)

    print("-" * 30)
    print("ダウンロード処理完了。")
    print(f"ダウンロード成功: {downloaded_count} 件")
    print(f"スキップ (既に存在): {skipped_count} 件")
    print(f"保存先: {os.path.abspath(SAVE_DIR)}")

if __name__ == '__main__':
    download_images_from_wiki()
