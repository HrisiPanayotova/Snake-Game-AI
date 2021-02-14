import { GAME_OBJ_SIZE } from "./Settings.js";
export function getRandomValue() {
    return Math.random() * GAME_OBJ_SIZE * 2 - GAME_OBJ_SIZE;
}