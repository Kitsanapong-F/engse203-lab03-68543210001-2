# ENGSE203 LAB 03 — Responsive Web UI, Event and Form

## ผู้จัดทำ

- ชื่อ-นามสกุล: <ใส่ชื่อ-นามสกุลของคุณที่นี่>
- รหัสนักศึกษา: <ใส่รหัสนักศึกษาของคุณที่นี่>
- ระบบปฏิบัติการที่ใช้: Windows (WSL - Ubuntu)

## วัตถุประสงค์ของงาน

- เพื่อศึกษาและใช้งาน Semantic HTML และหลักการ Accessibility (a11y) ในการพัฒนาเว็บฟอร์ม
- เพื่อพัฒนาและออกแบบ Responsive Layout ที่รองรับการแสดงผลบนหน้าจอขนาดต่าง ๆ (รวมถึงขนาด 375px และการ Zoom 200%) โดยไม่มี Web UI Breakdown หรือ Horizontal Scroll
- เพื่อเรียนรู้การจัดการสเตตัสและเหตุการณ์บนเว็บเพจผ่าน Event Listener (`input`, `submit`) และการจัดการ DOM Manipulation แบบปลอดภัยด้วย `textContent`
- เพื่อฝึกฝนกระบวนการทำงานร่วมกันโดยใช้ Gitflow Workflow (Feature Branch และ Merge Checkpoints) พร้อมทั้งฝึกใช้งาน GitHub Pages

## เครื่องมือที่ใช้

- **Editor:** Visual Studio Code
- **Environment:** WSL (Windows Subsystem for Linux - Ubuntu)
- **Build Tool:** Vite
- **Version Control:** Git & GitHub

## วิธีติดตั้งและรัน

```bash
# ติดตั้ง dependencies ทั้งหมด
npm install

# รันโปรเจกต์ในโหมด Development
npm run dev

# บิลด์โปรเจกต์เพื่อเตรียม Deploy
npm run build

โครงสร้างไฟล์
Plaintext
.
├── src/
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
└── README.md
```
## หลักฐานผลลัพธ์

- **Semantic HTML / Accessibility:** มีการใช้แท็กโครงสร้างพื้นฐานครบถ้วน (`header`, `main`, `section`, `aside`, `form`) และมีการผูก `aria-describedby` เพื่อเชื่อมโยงช่องกรอกข้อมูลกับข้อความช่วยเหลือ/ข้อความแจ้งเตือนความผิดพลาด
- **Event & Live Preview:** ระบบแสดงผลลัพธ์การพิมพ์แบบทันที (Live Preview) รวมถึงมีฟังก์ชัน Live Counter นับจำนวนตัวอักษรในกล่อง Details แบบเรียลไทม์ และระบบเมื่อกด Submit จะส่งข้อมูลลงรายการด้านล่างพร้อมเคลียร์ฟอร์มโดยไม่รีเฟรชหน้าเว็บด้วย `preventDefault()`
- **Responsive Layout:** หน้าเว็บสามารถปรับสัดส่วนการแสดงผลจาก 2 คอลัมน์บน Desktop ลงมาเหลือ 1 คอลัมน์บน Mobile (375px) ได้อย่างสมบูรณ์ และรองรับการขยายหน้าจอแบบ Zoom 200% ได้โดยไม่เกิดแถบเลื่อนแนวนอน (Horizontal Scroll)

*(คำแนะนำ: แปะภาพหน้าจอผลลัพธ์เวอร์ชัน Desktop, Mobile (375px) และตอนแจ้งเตือน Error ตรงส่วนนี้เพิ่มเติมครับ)*

## ปัญหาที่พบและวิธีแก้ไข

- **ปัญหาที่ 1:** เกิดช่องว่างขนาดใหญ่ (Large Gap) คั่นกลางระหว่างกล่องข้อความ Details และแถบแนะนำ/ตัวนับอักษรด้านล่าง
  - **วิธีแก้:** ตรวจสอบพบว่าเกิดจากแท็ก `<p>` ของจุดแสดง Error มี Margin เริ่มต้นดันเนื้อหาลงไป จึงทำการรีเซ็ต `margin: 0;` และใช้ Pseudo-class `.error:empty { display: none; }` เพื่อซ่อนแท็กดังกล่าวในขณะที่ยังไม่มีข้อความแจ้งเตือนความผิดพลาด
- **ปัญหาที่ 2:** เมื่อพิมพ์ข้อความภาษาอังกฤษหรืออักขระยาวติดต่อกันเป็นพรืดโดยไม่มีการเว้นวรรคในฟอร์ม ข้อความจะปลิ้นทะลุกรอบ (Overflow Breakdown) ออกมานอกพื้นที่ Live Preview
  - **วิธีแก้:** เพิ่มคำสั่ง `overflow-wrap: break-word;` และ `word-break: break-all;` ให้กับแท็กแสดงผลพรีวิวในไฟล์ CSS เพื่อบังคับให้ข้อความตัดคำขึ้นบรรทัดใหม่ทันทีเมื่อชนขอบขวาของเฟรม


## References & AI Assistance


My adaptation: นำคำแนะนำมาประยุกต์เขียน CSS และสลับพอร์ตการเชื่อมต่อ Git บนสภาพแวดล้อม WSL ของตัวเอง รวมถึงพัฒนาฟังก์ชัน JavaScript อัปเดตตัวนับจำนวนตัวอักษร (Live Counter) แบบสด ๆ ร่วมกับโครงสร้างแล็บเดิมอย่างปลอดภัย
