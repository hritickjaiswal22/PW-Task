const btn = document.getElementById("btn");
const tbody = document.querySelector("tbody");
const files = [];
const myModal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function render() {
  tbody.innerHTML = "";

  files.forEach((obj, index) => {
    const row = document.createElement("tr");
    const name = document.createElement("td");
    const size = document.createElement("td");
    const ext = document.createElement("td");
    const btn = document.createElement("button");

    btn.classList.add("btn");
    btn.setAttribute("data-index", index);
    name.setAttribute("data-label", "File Name");
    size.setAttribute("data-label", "File Size");
    ext.setAttribute("data-label", "Info");

    name.innerText = obj.filename;
    size.innerText = obj.formattedSize;
    btn.innerText = "Info";

    row.appendChild(name);
    row.appendChild(size);
    ext.appendChild(btn);
    row.appendChild(ext);

    tbody.appendChild(row);
  });
}

function selectHandler(e) {
  const { name, size } = e.target.files[0];
  const arr = name.split(".");

  const filename = arr[0];
  const ext = arr[1];
  const formattedSize = formatBytes(Number(size));

  const obj = { filename, ext, formattedSize };
  files.push(obj);

  files.sort((a, b) => {
    if (a.ext < b.ext) return -100;
    else return 100;
  });

  render();
}

function clickHandler(e) {
  const index = e.target.getAttribute("data-index");

  if (index !== null && index !== undefined) {
    modalContent.innerHTML = "";
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const span = document.createElement("span");

    span.classList.add("close");

    p1.innerText = `Extension : ${files[index].ext}`;
    p2.innerText = `File Name : ${files[index].filename}`;
    p3.innerText = `Size : ${files[index].formattedSize}`;
    span.innerText = "X";
    span.addEventListener("click", () => {
      myModal.style.display = "none";
    });

    modalContent.appendChild(span);
    modalContent.appendChild(p1);
    modalContent.appendChild(p2);
    modalContent.appendChild(p3);

    myModal.appendChild(modalContent);
    myModal.style.display = "block";
  }
}

btn.addEventListener("change", selectHandler);
tbody.addEventListener("click", clickHandler);
