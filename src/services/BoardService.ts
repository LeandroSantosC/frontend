import { request } from './api/request'
import { BoardData, NewBoardData } from '../components/Content/Board/Board'

export const createBoardService = () => {
  const base = '/api/board'

  return {
    getBoards: () => request<BoardData[]>({ method: 'GET', url: base }),
    createBoard: (data: NewBoardData) =>
      request<BoardData>({ method: 'POST', url: base, data }),
    updateBoard: (id: string, data: NewBoardData) =>
      request<BoardData>({ method: 'PATCH', url: `${base}/${id}`, data }),
    deleteBoard: (id: string) =>
      request<string>({ method: 'DELETE', url: `${base}/${id}` }),
  }
}