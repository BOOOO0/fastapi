const createMemo = async (value) => {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  const jsonRes = await res.json();
  let idd = await res.body.content;
  console.log(idd);
  readMemo();
};

const readMemo = async () => {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo);
};

const displayMemo = (memo) => {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerHTML = `[id:${memo.id}] ${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.innerHTML = "수정하기";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  const delBtn = document.createElement("button");
  delBtn.innerHTML = "삭제";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  li.appendChild(editBtn);
  li.appendChild(delBtn);
  ul.appendChild(li);
};

const editMemo = async (event) => {
  const id = event.target.dataset.id;
  const editInput = prompt("내용을 수정해주세요.");
  const res = await fetch(`/memo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      content: editInput,
    }),
  });
  readMemo();
};

const deleteMemo = async (event) => {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
  });
  readMemo();
};

const handleSubmit = (event) => {
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
};

readMemo();

const form = document.querySelector("#memo-form");

form.addEventListener("submit", handleSubmit);
