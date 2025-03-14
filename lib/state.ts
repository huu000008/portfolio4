import { create } from 'zustand';

interface NotionPage {
  id: string;
  title: string;
  summary: string;
}

interface NotionState {
  notionPages: NotionPage[]; // ✅ 모든 데이터를 배열로 저장
  setNotionPages: (pages: NotionPage[]) => void; // ✅ 새로운 setter 추가
}

export const useNotionStore = create<NotionState>((set) => ({
  notionPages: [], // ✅ 변경된 전역 변수
  setNotionPages: (pages) => set({ notionPages: pages }), // ✅ 상태 업데이트 함수 추가
}));
