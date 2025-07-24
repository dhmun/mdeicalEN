import pandas as pd
import re
import sys

# -------------------------------------------------------------------
# Step 1: 파일 읽기
# -------------------------------------------------------------------
try:
    df = pd.read_excel('data.xlsx')
    print("✅ 'data.xlsx - Sheet1.csv' 파일을 성공적으로 불러왔습니다.")
except FileNotFoundError:
    print("❌ 'data.xlsx - Sheet1.csv' 파일을 찾을 수 없습니다.")
    sys.exit()
except Exception as e:
    print(f"파일을 읽는 중 오류가 발생했습니다: {e}")
    sys.exit()

# -------------------------------------------------------------------
# Step 2: 데이터 표준화 및 정리
# -------------------------------------------------------------------

# 열 이름의 앞뒤 공백을 제거하여 오류 방지
df.columns = [col.strip() for col in df.columns]

# 열 이름 자동 감지
address_col = 'City' if 'City' in df.columns else 'city'
name_col = 'Name' if 'Name' in df.columns else 'name'
category_col = 'Category' if 'Category' in df.columns else 'category'
nearby_col = 'Nearby facilities' if 'Nearby facilities' in df.columns else ''

# 열 이름 표준화
df.rename(columns={
    address_col: 'City',
    name_col: 'Name',
    category_col: 'Category',
    nearby_col: 'Nearby_Facilities'
}, inplace=True)

# ✨ 핵심 수정: 최종 출력할 열 목록에 'Category'를 포함합니다.
final_cols = ['Category', 'Name', 'City', 'Nearby_Facilities']

# 파일에 존재하는 열만 선택하여 오류 방지
final_cols_exist = [col for col in final_cols if col in df.columns]
cleaned_df = df[final_cols_exist]

# -------------------------------------------------------------------
# Step 3: 처리된 데이터를 CSV 파일로 저장
# -------------------------------------------------------------------
try:
    cleaned_df.to_csv('cleaned_data.csv', index=False, encoding='utf-8-sig')
    print("\n✅ 'Category'가 포함된 'cleaned_data.csv' 파일이 성공적으로 생성되었습니다!")
except Exception as e:
    print(f"\n❌ 파일을 저장하는 중 오류가 발생했습니다: {e}")