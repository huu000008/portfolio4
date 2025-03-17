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

  const textBlocks = Object.values(recordMap.block)
    .map((block: any) => block?.value)
    .filter((block: any) => block?.type === 'text' && block?.properties?.title);

  return textBlocks.length > 0
    ? textBlocks[0].properties.title[0].flat().join(' ')
    : '개요 없음';
}

export function getPageTechnology(recordMap: any): string[] {
  if (!recordMap?.block) return ['기술 정보를 불러올 수 없습니다.'];

  // 모든 블록 가져오기
  const blocks = Object.values(recordMap.block).map(
    (block: any) => block?.value
  );

  // 기술 스택 제목 블록 찾기 (heading 또는 text 타입)
  const techHeaderIndex = blocks.findIndex((block: any) => {
    if (!block?.properties?.title) return false;

    const titleText = block.properties.title.flat().join('').toLowerCase();

    return (
      titleText.includes('사용 기술 스택') ||
      titleText.includes('기술 스택') ||
      titleText.includes('tech stack')
    );
  });

  // 제목 블록을 찾지 못한 경우
  if (techHeaderIndex === -1) return ['기술 정보 없음'];

  // 제목 다음 블록부터 다른 제목이 나올 때까지의 내용 추출
  const techItems: string[] = [];
  let i = techHeaderIndex + 1;

  while (i < blocks.length) {
    const block = blocks[i];

    // 다음 제목(heading)을 만나면 중단
    if (
      block?.type?.includes('header') ||
      (block?.properties?.title &&
        block.properties.title
          .flat()
          .join('')
          .match(/^#+\s|^###/))
    ) {
      break;
    }

    // 내용이 있는 경우 추가
    if (block?.properties?.title) {
      const content = block.properties.title.flat().join(' ').trim();

      if (content) {
        // 볼드 마크업(**) 및 'b' 표시 제거
        const techName = content.replace(/\*\*/g, '').replace(/ b$/, '').trim();

        // 빈 항목이 아니면 추가
        if (techName && !techName.startsWith('-')) {
          techItems.push(techName);
        }
      }
    }

    i++;
  }

  return techItems.length > 0 ? techItems : ['기술 정보 없음'];
}
