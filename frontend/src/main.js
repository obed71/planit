import './style.css';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3000/api/',
});

await renderTable();

document.querySelector('#form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputName = document.getElementById('name').value;
  const inputFrom = document.getElementById('from').value;
  const inputTo = document.getElementById('to').value;

  for (let el of [inputName, inputFrom, inputTo]) {
    if (!el.trim()) return;
  }

  const res = await api.post('activities', {
    name: inputName,
    from: inputFrom,
    to: inputTo,
  });

  if (res.statusText == 'OK') {
    await renderTable(res.data);
    document
      .querySelector('#form')
      .querySelectorAll('input')
      .forEach((el) => (el.value = ''));
    return;
  }
});

async function renderTable(additional = {}) {
  const res = await api.get('activities');

  const { data } = res;
  const activitiesEl = document.getElementById('activities');

  if (!data.length && !('name' in additional)) {
    activitiesEl.innerHTML = `
        <div id="no-data">
          Hey 👋, Your timetable is empty. Just add there some activities.
        </div>
      `;
    return;
  }

  const containerEl = document.createElement('div');
  containerEl.classList.add('grid');

  ['Activity', 'From', 'To'].forEach((act) => {
    const childEl = document.createElement('div');
    childEl.classList.add('grid-child', 'first-row');

    childEl.textContent = act;
    containerEl.append(childEl);
  });

  [...data, additional].forEach((act, index) => {
    const { name, from, to } = act;

    [name, from, to].forEach((el) => {
      const childEl = document.createElement('div');
      childEl.classList.add('grid-child', `${index % 2 ? 'even' : 'odd'}`);

      childEl.textContent = el;
      el ? containerEl.append(childEl) : '';
    });
  });

  activitiesEl.innerHTML = '';
  activitiesEl.append(containerEl);
}
