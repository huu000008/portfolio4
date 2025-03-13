export const getRelativeTimeOrStatus = (dateString: string): string => {
  if (!dateString) return '날짜 없음'; // 날짜가 없으면 "날짜 없음" 표시

  const now = new Date(); // 현재 시간
  const targetDate = new Date(dateString); // 입력된 종료 날짜
  const diff = Math.floor((now.getTime() - targetDate.getTime()) / 1000); // 시간 차이 (초 단위)

  // ✅ 아직 기간이 지나지 않았다면 "진행 중" 표시
  if (diff < 0) return '진행 중';

  // ✅ 이미 기간이 지난 경우 상대적 시간 표시
  if (diff < 60) return `${diff}초 전`; // 1분 미만
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`; // 1시간 미만
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`; // 24시간 미만
  if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`; // 30일 미만
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}달 전`; // 12개월 미만
  return `${Math.floor(diff / 31536000)}년 전`; // 1년 이상
};

export function getPageSummary(recordMap: any): string {
  if (!recordMap?.block) return '개요를 불러올 수 없습니다.';

  // console.log('🔍 Debugging recordMap:', recordMap);

  const textBlocks = Object.values(recordMap.block)
    .map((block: any) => block?.value)
    .filter((block: any) => block?.type === 'text' && block?.properties?.title);

  // console.log('✅ 추출된 텍스트 블록:', textBlocks);
  console.log(textBlocks[0].properties.title[0].flat().join(' '));
  return textBlocks.length > 0
    ? textBlocks[0].properties.title[0].flat().join(' ')
    : '개요 없음';
}
