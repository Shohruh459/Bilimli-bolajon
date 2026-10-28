/**
 * Darajali o'yin qobig'i ("topish" mexanikasiga tushmaydigan o'yinlar uchun: Juftini top, Ketma-ketlik).
 *  #/oyin/<id>      → daraja tanlash (ui/level-picker), yopiq darajaga qulf
 *  #/oyin/<id>/<n>  → cfg.play(api, n, done) — o'yin tugaganda done() yulduz beradi va
 *                     keyingi daraja ochilsa "N-daraja oçildi!" deydi.
 */
import type { PhraseKey } from '../content/phrases';
import { svg } from '../ui/dom';
import { showLevelPicker } from '../ui/level-picker';
import type { GameApi, GameFactory } from './game';
import { isUnlocked, levelStarKey, readLevelStars, starsNeeded, unlocksNext } from './levels';

export interface LevelGameConfig {
  readonly gameId: string;
  readonly title: string;
  /** Daraja tanlash ekranining data-testid si */
  readonly levelsTestId: string;
  /** Har daraja kartasidagi kichik belgilar (SVG) */
  readonly previews: readonly (readonly string[])[];
  /** Yangi daraja ochilganda aytiladi */
  readonly unlocked: PhraseKey;
  play(api: GameApi, level: number, done: () => void): void | Promise<void>;
}

export function createLevelGame(cfg: LevelGameConfig): GameFactory {
  const maxLevel = cfg.previews.length;
  const stars = () => readLevelStars(cfg.gameId, maxLevel);

  return (api) => {
    if (api.level === null) {
      const s = stars();
      return showLevelPicker(api.root, api.scope, {
        title: cfg.title,
        testId: cfg.levelsTestId,
        onBack: api.exit,
        onPlay: api.play,
        levels: cfg.previews.map((icons, i) => {
          const level = i + 1;
          return {
            level,
            open: isUnlocked(level, s, maxLevel),
            stars: s[i] ?? 0,
            need: starsNeeded(level, s),
            preview: icons.map((ic) => svg(ic)),
          };
        }),
      });
    }
    const level = api.level;
    if (!isUnlocked(level, stars(), maxLevel)) return api.exit();
    return cfg.play(api, level, () => {
      const opened = unlocksNext(level, stars(), maxLevel);
      api.finish({
        starKey: levelStarKey(cfg.gameId, level),
        ...(opened ? { note: { text: `${level + 1}-daraja oçildi!`, phrase: cfg.unlocked } } : {}),
      });
    });
  };
}
