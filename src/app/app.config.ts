import { ApplicationConfig, inject, InjectionToken, PLATFORM_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { isPlatformBrowser } from '@angular/common';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import { provideLottieOptions } from 'ngx-lottie';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';

// Crie um InjectionToken para o LOTTIE_PLAYER
export const LOTTIE_PLAYER = new InjectionToken('LOTTIE_PLAYER', {
  providedIn: 'root',
  factory: () => null,
});

// Função para carregar o player do lottie apenas no navegador
export function lottiePlayerFactory(platformId: Object) {
  return () => {
    if (isPlatformBrowser(platformId)) {
      return import('lottie-web').then(m => m.default);
    }
    return null; // Retorna null no servidor
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false,
        },
      },
      ripple: true,
      translation: {
        accept: 'Sim',
        reject: 'Não',
      },
    }),
    {
      provide: LOTTIE_PLAYER,
      useFactory: lottiePlayerFactory,
      deps: [PLATFORM_ID],
    },
    provideLottieOptions({
      player: () => {
        const player = inject(LOTTIE_PLAYER); // Obtém o player do InjectionToken
        if (player) {
          return (player as () => any)();
        }
        return null; // Retorna null no servidor
      },
    }),
  ],
};
