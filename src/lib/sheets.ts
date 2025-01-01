import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import type { FormData, SheetResponse } from './types';
import { SHEET_COLUMNS } from './constants';

export async function addRowToSheet(formData: FormData): Promise<SheetResponse> {
  try {
    const serviceAccountAuth = new JWT({
      email: import.meta.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: import.meta.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(import.meta.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    
    await sheet.addRow({
      [SHEET_COLUMNS.TIMESTAMP]: new Date().toISOString(),
      [SHEET_COLUMNS.FULL_NAME]: formData.fullName,
      [SHEET_COLUMNS.EMAIL]: formData.email,
      [SHEET_COLUMNS.POSITION]: formData.position,
      [SHEET_COLUMNS.RESUME_LINK]: formData.resumeLink,
      [SHEET_COLUMNS.WHY_JOIN_US]: formData.whyJoinUs
    });

    return { success: true };
  } catch (error) {
    console.error('Error adding row to sheet:', error);
    return { success: false, error: 'Failed to submit application' };
  }
}