import React, { FC, useRef, useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { Observable, of } from 'rxjs';
import { concatMap, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AppSound } from '@core/constants/sound.constants';
import { useGameController } from '@core/hooks/use-game-controller.hook';
import { useService } from '@core/hooks/use-service.hook';
import { SoundsService } from '@core/services/sounds/sounds.service';
import * as Styled from './round-themes.styles';

const APPEAR_TIME_DELAY = 300;
const SHOW_DELAY = 1100;

const RoundThemes: FC = () => {
  const [{ roundThemes$ }] = useGameController();
  const { getSound } = useService(SoundsService);
  const appearAnim = useRef(new Animated.Value(1)).current;
  const [currentTheme, setCurrentTheme] = useState<string>(null);

  useEffect(() => {
    const sound = getSound(AppSound.RoundBegin).play();
    return () => {
      sound.stop();
    };
  }, [getSound]);

  useEffect(() => {
    const subscription = roundThemes$
      .pipe(
        filter((data) => data.length > 0),
        take(1),
        map((data) => data.map((item) => item.name)),
        tap((themes) => setCurrentTheme(themes[0])),
        switchMap((themes) =>
          of(...themes.slice(1)).pipe(
            concatMap(
              (nextTheme) =>
                new Observable<void>((observer) => {
                  Animated.timing(appearAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                    delay: SHOW_DELAY,
                    duration: APPEAR_TIME_DELAY,
                  }).start(() => {
                    setCurrentTheme(nextTheme);
                    Animated.timing(appearAnim, {
                      toValue: 1,
                      useNativeDriver: true,
                      easing: Easing.inOut(Easing.ease),
                      duration: APPEAR_TIME_DELAY,
                    }).start(() => {
                      observer.next();
                      observer.complete();
                    });
                  });
                }),
            ),
          ),
        ),
      )
      .subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, [appearAnim, roundThemes$]);

  return (
    <Styled.Container
      style={{
        transform: [
          {
            scale: appearAnim,
          },
        ],
      }}>
      {currentTheme && <Styled.ThemeText>{currentTheme}</Styled.ThemeText>}
    </Styled.Container>
  );
};

export default RoundThemes;
