/*
 * Copyright (C) 2023-2024 brittni and the polar bear LLC.
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

import {
    ALL_PALETTES,
    Color,
    ColorSelector,
    ColorSelectorManager,
    Palette,
    PaletteColorSelector, Random,
    SketchContext
} from '@batpb/genart';

import '../assets/styles/sketch.css';

import { CanvasContext as Canvas } from './canvas-context';
import { ASPECT_RATIOS } from './aspect-ratios';

function sketch(p5: P5Lib): void {
    let selector: ColorSelector;
    const count: number = 50;
    const xs: number[] = [];
    const ys: number[] = [];
    const ds: number[] = [];
    const colors: Color[] = [];
    const outlines: Color[] = [];
    let isShowing: boolean = false;
    let max: number;
    let background: Color;

    // TODO - select aspect ratio (square, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 3:5, 5:3, 9:16, 16:9, 21:9, match-window)
    // TODO - select resolution (HD, 2K, 4K, 8K, match-window)

    const buildColorSelectorManager = (): ColorSelectorManager => {
        const manager: ColorSelectorManager = new ColorSelectorManager();
        const palettes: Palette[] = Array.from(ALL_PALETTES.values);
        const selectors: PaletteColorSelector[] = palettes.map((palette: Palette): PaletteColorSelector =>
            new PaletteColorSelector(palette)
        );
        manager.addColorSelectors(selectors);
        return manager;
    };

    p5.setup = (): void => {
        SketchContext.initialize(p5);
        Canvas.buildCanvas(ASPECT_RATIOS.SQUARE, 2048);
        // Canvas.buildCanvas(ASPECT_RATIOS['3:4'], 2048);
        // Canvas.buildCanvas(ASPECT_RATIOS['4:3'], 2048);
        // Canvas.buildCanvas(ASPECT_RATIOS['9:16'], 2048);
        // Canvas.buildCanvas(ASPECT_RATIOS['16:9'], 2048);
        // Canvas.buildCanvas(
        //     AspectRatioHandler.buildAspectRatio(16, 9),
        //     1080,
        //     p5.WEBGL);

        console.log(Canvas.defaultStroke);

        const manager: ColorSelectorManager = buildColorSelectorManager();
        selector = manager.getRandomColorSelector();
        max = Math.max(p5.width, p5.height);
        background = selector.getBackgroundColor(0.3, 0.5, 0.2);

        for (let i: number = 0; i < count; i++) {
            const d: number = Random.randomFloat(10, max * 0.2);
            const r: number = d / 2.0;
            const color: Color = new Color(selector.getColor().color);
            color.alpha = Math.floor(185);
            const outline: Color = new Color(selector.getColor().color);
            outline.alpha = 200;
            xs.push(Random.randomFloat(Canvas.minWidth + r, Canvas.maxWidth - r));
            ys.push(Random.randomFloat(Canvas.minHeight + r, Canvas.maxHeight - r));
            ds.push(d);
            colors.push(color);
            outlines.push(outline);
        }
    };

    p5.draw = (): void => {
        if (!isShowing) {
            p5.background(background.color);
            p5.strokeWeight(Canvas.defaultStroke * 5);

            for (let i: number = 0; i < count; i++) {
                p5.stroke(outlines[i].color);
                p5.fill(colors[i].color);
                p5.ellipse(xs[i], ys[i], ds[i], ds[i]);
            }

            isShowing = true;
        }
    };

    p5.windowResized = (): void => {
        Canvas.resizeCanvas();
        isShowing = false;
    };
}

new P5Lib(sketch);
