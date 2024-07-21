import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

export const useMainStore = create(
    devtools(
        combine(
            {
                access_token: '' as string,
                user: {} as any,
                userRole: '' as string,
                appLoaderText: '' as string,
                appLoader: false as boolean,
            },
            (set) => ({
                set,
                setRole: (inc: string) => set({ userRole: inc }),
                setAccessToken: (inc: string) => set({ access_token: inc }),
                setUser: (user: Object) => set({ user: user }),
                setAppLoader: (inc: boolean) => set({ appLoader: inc }),
                setAppLoaderText: (inc: string) => set({ appLoaderText: inc }),
                reset: () =>
                    set({
                        access_token: '' as string,
                        userRole: '' as string,
                        appLoaderText: '' as string,
                        appLoader: false as boolean,
                        user: {} as any,
                    })
            })
        ),
        { name: 'JetMainStore' }
    )
);
