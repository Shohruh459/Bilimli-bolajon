# Diniy matnlar — tasdiqlash jadvali

> **Qoida:** bu yerdagi matnlarni dasturchi (yoki AI) **yozmaydi va to'qimaydi**.
> Matnni faqat loyiha egasi manbadan tekshirib kiritadi va holatini `TASDIQLANGAN` ga o'zgartiradi.
> Ilova faqat `TASDIQLANGAN` holatdagi yozuvlarni ko'rsatadi (`src/content/diniy.ts` → `approvedOnly()`).

## Holatlar

| Holat            | Ma'nosi                                                  |
| ---------------- | -------------------------------------------------------- |
| `TASDIQLANMAGAN` | Bo'sh joy (placeholder). Ilovada ko'rinmaydi.            |
| `TEKSHIRUVDA`    | Matn kiritilgan, lekin hali tekshirilmoqda. Ko'rinmaydi. |
| `TASDIQLANGAN`   | Manba bilan solishtirilgan. Ilovada ko'rinadi.           |

## Jadval

Mavzular — faqat taklif (slotlar). Keraksizini o'chiring, keraklisini qo'shing.

| ID        | Mavzu (slot)           | Arabcha matn     | O'zbekcha ma'no  | Manba | Kim tekshirdi | Sana | Holat          |
| --------- | ---------------------- | ---------------- | ---------------- | ----- | ------------- | ---- | -------------- |
| `slot-01` | _(ota-ona belgilaydi)_ | [TASDIQLANMAGAN] | [TASDIQLANMAGAN] | —     | —             | —    | TASDIQLANMAGAN |
| `slot-02` | _(ota-ona belgilaydi)_ | [TASDIQLANMAGAN] | [TASDIQLANMAGAN] | —     | —             | —    | TASDIQLANMAGAN |
| `slot-03` | _(ota-ona belgilaydi)_ | [TASDIQLANMAGAN] | [TASDIQLANMAGAN] | —     | —             | —    | TASDIQLANMAGAN |

## Jarayon

1. Jadvalga qator qo'shing (mavzu, manba).
2. Matnni manbadan aynan ko'chiring → holat `TEKSHIRUVDA`.
3. Ikkinchi marta tekshiring (imkon bo'lsa — ustoz/imom bilan) → `TASDIQLANGAN`, sana va ism.
4. Xuddi shu ma'lumotni `src/content/diniy.ts` ga kiriting (holat bir xil bo'lishi shart).
5. Ovozli yozuv kerak bo'lsa — `docs/OVOZLAR.md` ga qo'shiladi.
