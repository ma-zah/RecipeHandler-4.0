import create from 'zustand'

import { ArchivedExpense, Expense } from '../model/model'
import { FirebaseService } from '../services/firebase'

export type ExpenseState = {
    expenses: Expense[]
    categories: string[]
    isNewExpenseDialogOpen: boolean
    autocompleteOptions: Record<
        keyof Pick<Expense, 'creator' | 'shop' | 'category' | 'description'>,
        string[]
    >
}

type ExpenseActions = {
    setExpenses: (expenses: Expense[]) => void
    addExpense: (expense: Expense, userId: string) => void
    openNewExpenseDialog: (isOpen: boolean) => void
    archiveExpense: (expense: Expense, userId: string) => void
    clearArchive: (archivedExpense: ArchivedExpense[], userId: string) => void
    restoreExpense: (archivedExpense: ArchivedExpense, userId: string) => void
    updateExpense: (expense: Expense, userId: string) => void
    setAutocompleteOptions: (autocompleteOptions: ExpenseState['autocompleteOptions']) => void
    setCategories: (categories: string[]) => void
}

export type ExpenseStore = ExpenseState & ExpenseActions

export const USER_COLLECTION = 'users'
export const EXPENSE_COLLECTION = 'expenses'
export const ARCHIVED_EXPENSES_COLLECTION = 'archivedExpenses'

const useExpenseStore = create<ExpenseStore>(set => ({
    expenses: [],
    categories: [],
    isNewExpenseDialogOpen: false,
    autocompleteOptions: { creator: [], shop: [], category: [], description: [] },
    setCategories: categories => {
        set(() => ({
            categories,
        }))
    },
    setExpenses: expenses => set(() => ({ expenses })),
    addExpense: (expense, userId) =>
        FirebaseService.firestore
            .collection(USER_COLLECTION)
            .doc(userId)
            .collection(EXPENSE_COLLECTION)
            .add(expense),
    archiveExpense: async ({ id, ...expense }, userId) => {
        const userDoc = FirebaseService.firestore.collection(USER_COLLECTION).doc(userId)
        await userDoc
            .collection(ARCHIVED_EXPENSES_COLLECTION)
            .add({ ...expense, deletedAt: FirebaseService.createTimestampFromDate(new Date()) })
        await userDoc.collection(EXPENSE_COLLECTION).doc(id).delete()
    },
    restoreExpense: async ({ deletedAt, ...expense }, userId) => {
        const userDoc = FirebaseService.firestore.collection(USER_COLLECTION).doc(userId)
        await userDoc.collection(EXPENSE_COLLECTION).add(expense)
        await userDoc.collection(ARCHIVED_EXPENSES_COLLECTION).doc(expense.id).delete()
    },
    clearArchive: async (expenses, userId) => {
        await Promise.all(
            expenses.map(e =>
                FirebaseService.firestore
                    .collection(USER_COLLECTION)
                    .doc(userId)
                    .collection(ARCHIVED_EXPENSES_COLLECTION)
                    .doc(e.id)
                    .delete()
            )
        )
    },
    openNewExpenseDialog: isNewExpenseDialogOpen => set(() => ({ isNewExpenseDialogOpen })),
    updateExpense: ({ id, ...expense }, userId) =>
        FirebaseService.firestore
            .collection(USER_COLLECTION)
            .doc(userId)
            .collection(EXPENSE_COLLECTION)
            .doc(id)
            .update(expense),
    setAutocompleteOptions: autocompleteOptions => {
        set(() => ({ autocompleteOptions }))
    },
}))

export default useExpenseStore