// api/AdminAPI.ts
import { request } from './api/request';
import { EditCardData } from '../components/Content/Card/CardEditor';
import { CardData } from '../components/Content/Card/Card';

const base = '/api/admin/card';

export const getPublicCards = () =>
  request<CardData>({ method: 'GET', url: base });

export const createPublicCard = (data: EditCardData) =>
  request<CardData>({ method: 'POST', url: base, data });

export const updatePublicCard = (id: string, data: EditCardData) =>
  request<CardData>({ method: 'PATCH', url: `${base}/${id}`, data });

export const deletePublicCard = (id: string) =>
  request<CardData>({ method: 'DELETE', url: `${base}/${id}` });

export const updateManyCards = (data: EditCardData[]) =>
  request<CardData>({ method: 'PATCH', url: `${base}/list`, data });
