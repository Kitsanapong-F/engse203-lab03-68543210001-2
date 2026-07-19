import './style.css';
const form = document.querySelector('#request-form');
const detailsCounter = document.querySelector('#details-count');

// TODO 1: query preview/status/list elements
const preview = {
    name: document.querySelector('#preview-name'),
    status: document.querySelector('#form-status'),
    type: document.querySelector('#preview-type'),
    list: document.querySelector('#request-list'),
    details: document.querySelector('#preview-details'),
}

// TODO 2: readForm()
function readForm() {
    return Object.fromEntries(new FormData(form).entries());
}

// TODO 3: renderPreview(data)
function renderPreview(data) {
    preview.name.textContent = data.requester_name?.trim() || 'ยังไม่ระบุชื่อ';
    preview.type.textContent = data.select?.trim() || 'ยังไม่เลือกประเภท'
    preview.details.textContent = data.details?.trim() || 'ยังไม่มีรายละเอียด'
}
// TODO 4: validate(data)
function validate(data) {
    const errors = {};

    if (!data.requester_name || data.requester_name.trim().length < 2) {
        errors.requester_name = 'กรุณากรอกชื่อผู้แจ้ง';
    }

    if (!data.select || data.select.trim() === '') {
        errors.select = 'กรุณาเลือกประเภท';
    }

    if (!data.details || data.details.trim().length < 10) {
        errors.details = 'กรุณาเขียนอย่างน้อย 10 ตัวอักษร';
    }
    return errors;
}
// TODO 5: renderErrors(errors)
function renderErrors(errors) {
    const fieldNames = ['requester_name', 'select', 'details'];

    for (const name of fieldNames) {
        const field = form.elements[name];
        const output = document.querySelector(`#${name}-error`);

        if (output) {
            const message = errors[name] ?? '';
            output.textContent = message;

            // ป้องกันไว้ก่อน: เผื่อสะกดชื่อฟิลด์ไม่ตรงกับ HTML โค้ดจะได้ไม่พังกลางทาง
            if (field) {
                field.setAttribute('aria-invalid', String(Boolean(message)));
            }
        }
    }

    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
        renderStatus('invalid', 'กรุณากรอกข้อมูลให้ถูกต้องและครบถ้วน');
    } else {
        renderStatus('idle', 'เริ่มพิมพ์เพื่อทดลอง Event และ Live Preview');
    }
}
// TODO 6: input and submit listeners

form.addEventListener('input', () => {
    const data = readForm();
    renderPreview(data);
    if (detailsCounter) {
        const currentLength = data.details?.trim().length || 0;
        detailsCounter.textContent = `${currentLength} ตัวอักษร`;
    }
});


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = readForm();
    const errors = validate(data);

    renderErrors(errors);


    if (Object.keys(errors).length === 0) {

        renderStatus('success', 'ส่งคำร้องขอสำเร็จ!');

        const newLi = document.createElement('li');
        newLi.textContent = `คำร้องจาก: ${data.requester_name}`;
        preview.list.appendChild(newLi);

        form.reset();
        renderPreview({ requester_name: '', select: '', details: '' });

        if (detailsCounter) {
            detailsCounter.textContent = '0 ตัวอักษร';
        }
    }
});

form.addEventListener('reset', () => {
  queueMicrotask(() => {
    renderErrors({});
    renderPreview(readForm());
    renderStatus('idle', 'พร้อมเริ่มกรอกข้อมูลใหม่');
  });
});
function renderStatus(type, message) {
    preview.status.textContent = message;
    preview.status.setAttribute('data-state', type);
}

renderPreview(readForm());
renderStatus('idle', 'เริ่มพิมพ์เพื่อทดลอง Event และ Live Preview');

console.log('LAB 3 starter ready', form);
