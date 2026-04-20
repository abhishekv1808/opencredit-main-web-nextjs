import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ApplicationData } from "@/components/forms/LoanApplicationForm";

interface ApplicationStore {
  draftData: Partial<ApplicationData>;
  currentStep: number;
  applicationId: string | null;
  setDraftData: (data: Partial<ApplicationData>) => void;
  setCurrentStep: (step: number) => void;
  setApplicationId: (id: string) => void;
  clearDraft: () => void;
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set) => ({
      draftData: {},
      currentStep: 1,
      applicationId: null,
      setDraftData: (data) =>
        set((state) => ({ draftData: { ...state.draftData, ...data } })),
      setCurrentStep: (step) => set({ currentStep: step }),
      setApplicationId: (id) => set({ applicationId: id }),
      clearDraft: () => set({ draftData: {}, currentStep: 1, applicationId: null }),
    }),
    {
      name: "opencredit-application-draft",
    }
  )
);
