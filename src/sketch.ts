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

function sketch(p5: P5Lib): void {
    let selector: ColorSelector;
    const xs: number[] = [];
    const ys: number[] = [];
    const ds: number[] = [];
    const colors: Color[] = [];

    const buildColorSelectorManager = (): ColorSelectorManager => {
        const manager: ColorSelectorManager = new ColorSelectorManager();
        const palettes: Palette[] = Array.from(ALL_PALETTES.values);
        const selectors: PaletteColorSelector[] = palettes.map((palette: Palette): PaletteColorSelector =>
            new PaletteColorSelector(palette)
        );
        manager.addColorSelectors(selectors);
        return manager;
    }

    p5.setup = (): void => {
        const canvas: P5Lib.Renderer = p5.createCanvas(1080, 1080, p5.WEBGL);
        canvas.attribute('style', 'height: 100vh;');
        SketchContext.initialize(p5);
        const manager: ColorSelectorManager = buildColorSelectorManager();
        selector = manager.getRandomColorSelector();

        for (let i: number = 0; i < 10; i++) {
            xs.push(Random.randomFloat((p5.width / 2.0) * -1, (p5.width / 2.0)));
            ys.push(Random.randomFloat((p5.height / 2.0) * -1, (p5.height / 2.0)));
            ds.push(Random.randomFloat(10, 100));
            colors.push(selector.getColor());
        }
    }

    p5.draw = () : void => {
        for (let i: number = 0; i < 10; i++) {
            p5.fill(colors[i].color);
            p5.ellipse(xs[i], ys[i], ds[i], ds[i]);
        }
    }
}

new P5Lib(sketch);
