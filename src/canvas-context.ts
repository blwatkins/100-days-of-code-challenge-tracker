/*
 * Copyright (C) 2024 brittni and the polar bear LLC.
 *
 * This file is a part of brittni and the polar bear's Generative Art Project Template,
 * which is released under the GNU Affero General Public License, Version 3.0.
 * You may not use this file except in compliance with the license.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. See LICENSE or go to
 * https://www.gnu.org/licenses/agpl-3.0.en.html for full license details.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 */

import P5Lib from 'p5';

import { SketchContext } from '@batpb/genart';

export class CanvasContext {
    private static _canvas: P5Lib.Renderer | undefined;
    private static _isWebGL: boolean;
    // TODO - default stroke

    public static buildCanvas(width: number, height: number, canvasType?: string) {
        let canvas: P5Lib.Renderer;
        const { p5 } = SketchContext;

        if (canvasType && canvasType === p5.WEBGL) {
            canvas = p5.createCanvas(width, height, p5.WEBGL);
            CanvasContext._isWebGL = true;
        } else {
            canvas = p5.createCanvas(width, height);
            CanvasContext._isWebGL = false;
        }

        if (width > height) {
            canvas.attribute('style', 'width: 100vw;');
        } else {
            canvas.attribute('style', 'height: 100vh;');
        }

        CanvasContext._canvas = canvas;
    }

    public static get canvas(): P5Lib.Renderer | undefined {
        return CanvasContext._canvas;
    }

    public static get isWebGL(): boolean {
        return CanvasContext._isWebGL;
    }

    public static get maxHeight(): number {
        const { p5 } = SketchContext;
        let max: number = p5.height;

        if (CanvasContext.isWebGL) {
            max = (p5.height / 2.0);
        }

        return max;
    }

    public static get maxWidth(): number {
        const { p5 } = SketchContext;
        let max: number = p5.width;

        if (CanvasContext.isWebGL) {
            max = (p5.width / 2.0);
        }

        return max;
    }

    public static get minHeight(): number {
        const { p5 } = SketchContext
        let min: number = 0;

        if (CanvasContext.isWebGL) {
            min = (p5.height / 2.0) * -1.0;
        }

        return min;
    }

    public static get minWidth(): number {
        const { p5 } = SketchContext;
        let min: number = 0;

        if (CanvasContext.isWebGL) {
            min = (p5.width / 2.0) * -1.0;
        }

        return min;
    }
}
