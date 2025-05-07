// services/CardService.ts
import { request } from './api/request'
import { EditCardData } from '../components/Content/Card/CardEditor'
import { CardData } from '../components/Content/Card/Card'

export const createCardService = (isAdmin: boolean) => {
  const base = isAdmin ? '/api/admin/card' : '/api/card'

  return {
    getCards: () => request<CardData[]>({ method: 'GET', url: base }),
    createCard: (data: EditCardData) =>
      request<CardData>({ method: 'POST', url: base, data }),
    updateCard: (id: string, data: EditCardData) =>
      request<CardData>({ method: 'PATCH', url: `${base}/${id}`, data }),
    deleteCard: (id: string) =>
      request<string>({ method: 'DELETE', url: `${base}/${id}` }),
    updateManyCards: (data: EditCardData[]) =>
      isAdmin
        ? request<CardData[]>({ method: 'PATCH', url: `${base}/list`, data })
        : Promise.reject('updateManyCards only available for admin'),
  }
}
