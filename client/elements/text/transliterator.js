//The below functions change the script. to Sinhala, Devanagari, Myanmar or Thai.
// Note that they also remove all html coding first so this might have to be changed.

export const Transliterator = function() {
    this.toSinhala = (l) => {
        l = l.replace(/<.*?>/g, '');
        l = l.toLowerCase() + ' ';
        const m = { a: 'අ', 'ā': 'ආ', i: 'ඉ', 'ī': 'ඊ', u: 'උ', 'ū': 'ඌ', e: 'එ', o: 'ඔ' };
        const b = {
            'ā': 'ා',
            i: 'ි',
            'ī': 'ී',
            u: 'ු',
            'ū': 'ූ',
            e: 'ෙ',
            o: 'ො',
            'ṁ': 'ං',
            k: 'ක',
            g: 'ග',
            'ṅ': 'ඞ',
            c: 'ච',
            j: 'ජ',
            'ñ': 'ඤ',
            'ṭ': 'ට',
            'ḍ': 'ඩ',
            'ṇ': 'ණ',
            t: 'ත',
            d: 'ද',
            n: 'න',
            p: 'ප',
            b: 'බ',
            m: 'ම',
            y: 'ය',
            r: 'ර',
            l: 'ල',
            'ḷ': 'ළ',
            v: 'ව',
            s: 'ස',
            h: 'හ'
        };
        const j = {
            kh: 'ඛ',
            gh: 'ඝ',
            ch: 'ඡ',
            jh: 'ඣ',
            'ṭh': 'ඨ',
            'ḍh': 'ඪ',
            th: 'ථ',
            dh: 'ධ',
            ph: 'ඵ',
            bh: 'භ',
            'jñ': 'ඥ',
            'ṇḍ': 'ඬ',
            nd: 'ඳ',
            mb: 'ඹ',
            rg: 'ඟ'
        };
        const a = {
            k: 'ක',
            g: 'ග',
            'ṅ': 'ඞ',
            c: 'ච',
            j: 'ජ',
            'ñ': 'ඤ',
            'ṭ': 'ට',
            'ḍ': 'ඩ',
            'ṇ': 'ණ',
            t: 'ත',
            d: 'ද',
            n: 'න',
            p: 'ප',
            b: 'බ',
            m: 'ම',
            y: 'ය',
            r: 'ර',
            l: 'ල',
            'ḷ': 'ළ',
            v: 'ව',
            s: 'ස',
            h: 'හ'
        };
        let k, g, f, e, d;
        let c = '';
        let h = 0;
        while (h < l.length) {
            k = l.charAt(h - 2);
            g = l.charAt(h - 1);
            f = l.charAt(h);
            e = l.charAt(h + 1);
            d = l.charAt(h + 2);
            if (m[f]) {
                if (h === 0 || g === 'a') {
                    c += m[f];
                } else {
                    if (f !== 'a') {
                        c += b[f];
                    }
                }
                h++;
            } else {
                if (j[f + e]) {
                    c += j[f + e];
                    h += 2;
                    if (a[d]) {
                        c += '්';
                    }
                } else {
                    if (b[f] && f !== 'a') {
                        c += b[f];
                        h++;
                        if (a[e] && f !== 'ṁ') {
                            c += '්';
                        }
                    } else {
                        if (!b[f]) {
                            if (a[g] || (g === 'h' && a[k])) {
                                c += '්';
                            }
                            c += f;
                            h++;
                            if (m[e]) {
                                c += m[e];
                                h++;
                            }
                        } else {
                            h++;
                        }
                    }
                }
            }
        }
        if (a[f]) {
            c += '්';
        }
        c = c.replace(/ඤ්ජ/g, 'ඦ');
        c = c.replace(/ණ්ඩ/g, 'ඬ');
        c = c.replace(/න්ද/g, 'ඳ');
        c = c.replace(/ම්බ/g, 'ඹ');
        c = c.replace(/්ර/g, '්ර');
        c = c.replace(/\`+/g, '"');
        return c.slice(0, -1);
    };

    this.toMyanmar = (k) => {
        k = k.replace(/<.*?>/g, '');
        k = k.toLowerCase() + ' ';
        const m = { a: 'အ', i: 'ဣ', u: 'ဥ', 'ā': 'အာ', 'ī': 'ဤ', 'ū': 'ဦ', e: 'ဧ', o: 'ဩ' };
        const l = {
            i: 'ိ',
            'ī': 'ီ',
            u: 'ု',
            'ū': 'ူ',
            e: 'ေ',
            'ṁ': 'ံ',
            k: 'က',
            kh: 'ခ',
            g: 'ဂ',
            gh: 'ဃ',
            'ṅ': 'င',
            c: 'စ',
            ch: 'ဆ',
            j: 'ဇ',
            jh: 'ဈ',
            'ñ': 'ဉ',
            'ṭ': 'ဋ',
            'ṭh': 'ဌ',
            'ḍ': 'ဍ',
            'ḍh': 'ဎ',
            'ṇ': 'ဏ',
            t: 'တ',
            th: 'ထ',
            d: 'ဒ',
            dh: 'ဓ',
            n: 'န',
            p: 'ပ',
            ph: 'ဖ',
            b: 'ဗ',
            bh: 'ဘ',
            m: 'မ',
            y: 'ယ',
            r: 'ရ',
            l: 'လ',
            'ḷ': 'ဠ',
            v: 'ဝ',
            s: 'သ',
            h: 'ဟ'
        };
        const a = {
            k: 'က',
            g: 'ဂ',
            'ṅ': 'င',
            c: 'စ',
            j: 'ဇ',
            'ñ': 'ဉ',
            'ṭ': 'ဋ',
            'ḍ': 'ဍ',
            'ṇ': 'ဏ',
            t: 'တ',
            d: 'ဒ',
            n: 'န',
            p: 'ပ',
            b: 'ဗ',
            m: 'မ',
            y: 'ယ',
            r: 'ရ',
            l: 'လ',
            'ḷ': 'ဠ',
            v: 'ဝ',
            s: 'သ',
            h: 'ဟ'
        };
        const n = { kh: '1', g: '1', d: '1', dh: '1', p: '1', v: '1' };
        let j, f, e, d, c;
        let b = '';
        let g = 0;
        k = k.replace(/\&quot;/g, '`');
        let h = false;
        while (g < k.length) {
            j = k.charAt(g - 2);
            f = k.charAt(g - 1);
            e = k.charAt(g);
            d = k.charAt(g + 1);
            c = k.charAt(g + 2);
            if (m[e]) {
                if (g === 0 || f === 'a') {
                    b += m[e];
                } else {
                    if (e === 'ā') {
                        if (n[h]) {
                            b += 'ါ';
                        } else {
                            b += 'ာ';
                        }
                    } else {
                        if (e === 'o') {
                            if (n[h]) {
                                b += 'ေါ';
                            } else {
                                b += 'ော';
                            }
                        } else {
                            if (e !== 'a') {
                                b += l[e];
                            }
                        }
                    }
                }
                g++;
                h = false;
            } else {
                if (l[e + d] && d === 'h') {
                    b += l[e + d];
                    if (c !== 'y' && !h) {
                        h = e + d;
                    }
                    if (a[c]) {
                        b += '္';
                    }
                    g += 2;
                } else {
                    if (l[e] && e !== 'a') {
                        b += l[e];
                        g++;
                        if (d !== 'y' && !h) {
                            h = e;
                        }
                        if (a[d] && e !== 'ṁ') {
                            b += '္';
                        }
                    } else {
                        if (!l[e]) {
                            b += e;
                            g++;
                            if (m[d]) {
                                if (m[d + c]) {
                                    b += m[d + c];
                                    g += 2;
                                } else {
                                    b += m[d];
                                    g++;
                                }
                            }
                            h = false;
                        } else {
                            h = false;
                            g++;
                        }
                    }
                }
            }
        }
        b = b.replace(/ဉ္ဉ/g, 'ည');
        b = b.replace(/္ယ/g, 'ျ');
        b = b.replace(/္ရ/g, 'ြ');
        b = b.replace(/္ဝ/g, 'ွ');
        b = b.replace(/္ဟ/g, 'ှ');
        b = b.replace(/သ္သ/g, 'ဿ');
        b = b.replace(/င္/g, 'င်္');
        return b.slice(0, -1);
    };

    this.toDevanagari = (l) => {
        l = l.replace(/<.*?>/g, '');
        l = l.toLowerCase() + ' ';
        const m = { a: ' अ', i: ' इ', u: ' उ', 'ā': ' आ', 'ī': ' ई', 'ū': ' ऊ', e: ' ए', o: ' ओ' };
        let n = {
            'ā': 'ा',
            i: 'ि',
            'ī': 'ी',
            u: 'ु',
            'ū': 'ू',
            e: 'े',
            o: 'ो',
            'ṁ': 'ं',
            k: 'क',
            kh: 'ख',
            g: 'ग',
            gh: 'घ',
            'ṅ': 'ङ',
            c: 'च',
            ch: 'छ',
            j: 'ज',
            jh: 'झ',
            'ñ': 'ञ',
            'ṭ': 'ट',
            'ṭh': 'ठ',
            'ḍ': 'ड',
            'ḍh': 'ढ',
            'ṇ': 'ण',
            t: 'त',
            th: 'थ',
            d: 'द',
            dh: 'ध',
            n: 'न',
            p: 'प',
            ph: 'फ',
            b: 'ब',
            bh: 'भ',
            m: 'म',
            y: 'य',
            r: 'र',
            l: 'ल',
            'ḷ': 'ळ',
            v: 'व',
            s: 'स',
            h: 'ह'
        };
        let k, h, g, f, e, d, b;
        let c = '';
        let a = 0;
        let j = 0;
        l = l.replace(/\&quot;/g, '`');
        while (j < l.length) {
            k = l.charAt(j - 2);
            h = l.charAt(j - 1);
            g = l.charAt(j);
            f = l.charAt(j + 1);
            e = l.charAt(j + 2);
            d = l.charAt(j + 3);
            b = l.charAt(j + 4);
            if (j === 0 && m[g]) {
                c += m[g];
                j += 1;
            } else {
                if (f === 'h' && n[g + f]) {
                    c += n[g + f];
                    if (e && !m[e] && f !== 'ṁ') {
                        c += '्';
                    }
                    j += 2;
                } else {
                    if (n[g]) {
                        c += n[g];
                        if (f && !m[f] && !m[g] && g !== 'ṁ') {
                            c += '्';
                        }
                        j++;
                    } else {
                        if (g !== 'a') {
                            if (a[h] || (h === 'h' && a[k])) {
                                c += '्';
                            }
                            c += g;
                            j++;
                            if (m[f]) {
                                c += m[f];
                                j++;
                            }
                        } else {
                            j++;
                        }
                    }
                }
            }
        }
        if (a[g]) {
            c += '्';
        }
        c = c.replace(/\`+/g, '"');
        return c.slice(0, -1);
    };

    this.toThai = (m) => {
        m = m.replace(/<.*?>/g, '');
        m = m.toLowerCase() + ' ';
        const n = { a: '1', 'ā': '1', i: '1', 'ī': '1', 'iṁ': '1', u: '1', 'ū': '1', e: '2', o: '2' };
        const j = {
            a: 'อ',
            'ā': 'า',
            i: 'ิ',
            'ī': 'ี',
            'iṁ': 'ึ',
            u: 'ุ',
            'ū': 'ู',
            e: 'เ',
            o: 'โ',
            'ṁ': 'ํ',
            k: 'ก',
            kh: 'ข',
            g: 'ค',
            gh: 'ฆ',
            'ṅ': 'ง',
            c: 'จ',
            ch: 'ฉ',
            j: 'ช',
            jh: 'ฌ',
            'ñ': 'ญ',
            'ṭ': 'ฏ',
            'ṭh': 'ฐ',
            'ḍ': 'ฑ',
            'ḍh': 'ฒ',
            'ṇ': 'ณ',
            t: 'ต',
            th: 'ถ',
            d: 'ท',
            dh: 'ธ',
            n: 'น',
            p: 'ป',
            ph: 'ผ',
            b: 'พ',
            bh: 'ภ',
            m: 'ม',
            y: 'ย',
            r: 'ร',
            l: 'ล',
            'ḷ': 'ฬ',
            v: 'ว',
            s: 'ส',
            h: 'ห'
        };
        const a = {
            k: '1',
            g: '1',
            'ṅ': '1',
            c: '1',
            j: '1',
            'ñ': '1',
            'ṭ': '1',
            'ḍ': '1',
            'ṇ': '1',
            t: '1',
            d: '1',
            n: '1',
            p: '1',
            b: '1',
            m: '1',
            y: '1',
            r: '1',
            l: '1',
            'ḷ': '1',
            v: '1',
            s: '1',
            h: '1'
        };
        let l, h, g, f, e, d, b;
        let c = '';
        let k = 0;
        m = m.replace(/\&quot;/g, '`');
        while (k < m.length) {
            l = m.charAt(k - 2);
            h = m.charAt(k - 1);
            g = m.charAt(k);
            f = m.charAt(k + 1);
            e = m.charAt(k + 2);
            d = m.charAt(k + 3);
            b = m.charAt(k + 4);
            if (n[g]) {
                if (g === 'o' || g === 'e') {
                    c += j[g] + j.a;
                    k++;
                } else {
                    if (k === 0) {
                        c += j.a;
                    }
                    if (g === 'i' && f === 'ṁ') {
                        c += j[g + f];
                        k++;
                    } else {
                        if (g !== 'a') {
                            c += j[g];
                        }
                    }
                    k++;
                }
            } else {
                if (j[g + f] && f === 'h') {
                    if (e === 'o' || e === 'e') {
                        c += j[e];
                        k++;
                    }
                    c += j[g + f];
                    if (a[e]) {
                        c += 'ฺ';
                    }
                    k = k + 2;
                } else {
                    if (j[g] && g !== 'a') {
                        if (f === 'o' || f === 'e') {
                            c += j[f];
                            k++;
                        }
                        c += j[g];
                        if (a[f] && g !== 'ṁ') {
                            c += 'ฺ';
                        }
                        k++;
                    } else {
                        if (!j[g]) {
                            c += g;
                            if (a[h] || (h === 'h' && a[l])) {
                                c += 'ฺ';
                            }
                            k++;
                            if (f === 'o' || f === 'e') {
                                c += j[f];
                                k++;
                            }
                            if (n[f]) {
                                c += j.a;
                            }
                        } else {
                            k++;
                        }
                    }
                }
            }
        }
        if (a[g]) {
            c += 'ฺ';
        }
        c = c.replace(/\`+/g, '"');
        return c.slice(0, -1);
    };
};
