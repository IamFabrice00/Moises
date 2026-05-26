import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Locale } from "@/lib/i18n/translations";

export interface SizeSelection {
  xs: number;
  s: number;
  m: number;
  l: number;
  xl: number;
  xxl: number;
}

export interface OrderData {
  fullName: string;
  email: string;
  phone: string;
  notes: string;
  sizes: SizeSelection;
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };
}

export interface DesignState {
  locale: Locale;
  currentStep: 1 | 2 | 3 | 4 | 5;
  tshirtColor: string;
  logoFile: File | null;
  logoDataUrl: string | null;
  logoPosition: { x: number; y: number };
  logoScale: number;
  logoRotation: number;
  orderData: OrderData | null;

  // Actions
  setLocale: (locale: Locale) => void;
  setStep: (step: 1 | 2 | 3 | 4 | 5) => void;
  setColor: (color: string) => void;
  setLogo: (file: File | null, dataUrl: string | null) => void;
  setLogoPosition: (pos: { x: number; y: number } | ((prev: { x: number; y: number }) => { x: number; y: number })) => void;
  setLogoScale: (scale: number) => void;
  setLogoRotation: (rotation: number) => void;
  setOrderData: (data: OrderData | null) => void;
  resetAll: () => void;
}

const initialSizes: SizeSelection = {
  xs: 0,
  s: 0,
  m: 0,
  l: 0,
  xl: 0,
  xxl: 0,
};

export const useDesignStore = create<DesignState>()(
  persist(
    (set) => ({
      locale: "it",
      currentStep: 1,
      tshirtColor: "#FFFFFF",
      logoFile: null,
      logoDataUrl: null,
      logoPosition: { x: 0, y: -20 }, // Offsets from center
      logoScale: 50, // 20% to 100%
      logoRotation: 0, // -30 to +30 degrees
      orderData: null,

      setLocale: (loc) => set({ locale: loc }),
      setStep: (step) => set({ currentStep: step }),
      setColor: (color) => set({ tshirtColor: color }),
      setLogo: (file, dataUrl) => set({ logoFile: file, logoDataUrl: dataUrl }),
      setLogoPosition: (pos) =>
        set((state) => ({
          logoPosition: typeof pos === "function" ? pos(state.logoPosition) : pos,
        })),
      setLogoScale: (scale) => set({ logoScale: scale }),
      setLogoRotation: (rotation) => set({ logoRotation: rotation }),
      setOrderData: (data) => set({ orderData: data }),
      resetAll: () =>
        set({
          locale: "it",
          currentStep: 1,
          tshirtColor: "#FFFFFF",
          logoFile: null,
          logoDataUrl: null,
          logoPosition: { x: 0, y: -20 },
          logoScale: 50,
          logoRotation: 0,
          orderData: null,
        }),
    }),
    {
      name: "merch-studio-session",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => {
        // Exclude logoFile from session storage as File objects aren't JSON serializable
        const { logoFile, ...rest } = state;
        return rest;
      },
    }
  )
);
