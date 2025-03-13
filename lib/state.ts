import { create } from 'zustand';

interface NotionPage {
  id: string;
  title: string;
  summary: string;
}

interface NotionState {
  selectedPageId: string | null;
  recordMaps: Record<string, any>;
  notionPages: NotionPage[]; // ✅ 모든 데이터를 배열로 저장
  setSelectedPageId: (id: string | null) => void;
  setRecordMaps: (id: string, data: any) => void;
  setNotionPages: (pages: NotionPage[]) => void; // ✅ 새로운 setter 추가
}

export const useNotionStore = create<NotionState>((set) => ({
  selectedPageId: null,
  recordMaps: {},
  notionPages: [], // ✅ 변경된 전역 변수
  setSelectedPageId: (id) => set({ selectedPageId: id }),
  setRecordMaps: (id, data) =>
    set((state) => ({ recordMaps: { ...state.recordMaps, [id]: data } })),
  setNotionPages: (pages) => set({ notionPages: pages }), // ✅ 상태 업데이트 함수 추가
}));
