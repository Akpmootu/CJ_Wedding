export const WEDDING = {
  hashtag: '#CJTheWedding',
  bride: { nickname: 'Cherry', fullName: 'Waranya' },
  groom: { nickname: 'Jame', fullName: 'Rattanapon' },
  date: new Date('2026-07-11T09:00:00+07:00'),
  dateThai: 'วันเสาร์ที่ 11 กรกฎาคม 2569',
  dateEnglish: 'SATURDAY, 11 JULY 2026',
  youtubeId: 'F0irc4jfCtA',
  mapsUrl: 'https://maps.app.goo.gl/UL2x7TsyfNhMuN9s5',
  venue: {
    name: 'ห้องประชุมห้วยทราย 3',
    subtitle: 'วิทยาลัยเทคนิคสกลนคร',
    address: 'ณ ห้องประชุมห้วยทราย 3 วิทยาลัยเทคนิคสกลนคร',
  },
  timeline: [
    { time: '09.09 น.', title: 'แห่ขันหมาก', image: '/images/pic/CJ (1).jpg' },
    { time: '09.49 น.', title: 'สวมแหวน', image: '/images/pic/CJ (3).jpg' },
    { time: '10.49 น.', title: 'รดน้ำสังข์', image: '/images/pic/CJ (5).jpg' },
    { time: '11.30 น.', title: 'รับประทานอาหาร', image: '/images/pic/CJ (7).jpg' },
  ],
  dressCode: [
    { name: 'WHITE', nameTh: 'ขาว', hex: '#FFFFFF' },
    { name: 'SOFT PEACH', nameTh: 'พีชอ่อน', hex: '#FCD5B5' },
    { name: 'WARM ROSE', nameTh: 'ชมพูอุ่น', hex: '#F8A3B9' },
    { name: 'LAVENDER', nameTh: 'ลาเวนเดอร์', hex: '#F7A8F5' },
  ],
  contact: {
    groom: { name: 'เจ้าบ่าว เจมส์', phone: '081-078-0437' },
    bride: { name: 'เจ้าสาว เชอร์รี่', phone: '088-023-7424' },
  },
  calendar: {
    title: 'งานแต่งงาน Cherry (Waranya) & Jame (Rattanapon)',
    description: `#CJTheWedding

งานแต่งงาน Cherry (Waranya) & Jame (Rattanapon)
วันเสาร์ที่ 11 กรกฎาคม 2569

กำหนดการ:
09.09 น. — แห่ขันหมาก
09.49 น. — สวมแหวน
10.49 น. — รดน้ำสังข์
11.30 น. — รับประทานอาหาร

สถานที่: ห้องประชุมห้วยทราย 3 วิทยาลัยเทคนิคสกลนคร`,
    location: 'ห้องประชุมห้วยทราย 3 วิทยาลัยเทคนิคสกลนคร',
    start: '20260711T020900Z',
    end: '20260711T043000Z',
  },
} as const

export const GALLERY_IMAGES = Array.from({ length: 14 }, (_, i) => ({
  id: `cj-${i + 1}`,
  src: `/images/pic/CJ (${i + 1}).jpg`,
  alt: `Cherry & Jame pre-wedding ${i + 1}`,
}))

export const DIVIDER_IMAGES = [
  '/images/pic/CJ (2).jpg',
  '/images/pic/CJ (4).jpg',
  '/images/pic/CJ (6).jpg',
  '/images/pic/CJ (9).jpg',
  '/images/pic/CJ (10).jpg',
  '/images/pic/CJ (11).jpg',
  '/images/pic/CJ (12).jpg',
  '/images/pic/CJ (13).jpg',
  '/images/pic/CJ (14).jpg',
]
