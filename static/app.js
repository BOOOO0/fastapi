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
  ul.appendChild(li);
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
