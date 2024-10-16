// controllers/controlador.js
import { datos, LIMITE } from '../models/datos.js';

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  bindActions();
  renderAll(); // Renderiza todas las tablas al inicio
});

function initTabs() {
  const tabs = document.querySelectorAll('.tab-button');
  const sections = document.querySelectorAll('.section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;
      sections.forEach(section => section.classList.remove('active'));
      tabs.forEach(t => t.classList.remove('active'));
      document.querySelector(`#${target}`).classList.add('active');
      tab.classList.add('active');
    });
  });
}

function renderAll() {
  renderTable('proveedores');
  renderTable('clientes');
  renderTable('productos');
}

function renderTable(category) {
  const tableBody = document.querySelector(`#${category}-list`);
  tableBody.innerHTML = ''; // Limpiar la tabla
  datos[category].forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item}</td>
      <td><button class="edit-btn" data-category="${category}" data-index="${index}">Editar</button></td>
      <td><button class="delete-btn" data-category="${category}" data-index="${index}">Eliminar</button></td>
    `;
    tableBody.appendChild(row);
  });
  bindTableActions();
}

function bindActions() {
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      const input = document.querySelector(`#${category}-input`);
      if (input.value && datos[category].length < LIMITE) {
        datos[category].push(input.value);
        input.value = '';
        renderTable(category);
      } else {
        alert(`No puedes agregar más de ${LIMITE} elementos en ${category}`);
      }
    });
  });

  document.querySelectorAll('.search-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      const searchInput = document.querySelector(`#${category}-search`).value.toLowerCase();
      const results = datos[category].filter(item => item.toLowerCase().includes(searchInput));
      const tableBody = document.querySelector(`#${category}-list`);
      tableBody.innerHTML = ''; // Limpiar la tabla
      results.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item}</td>
          <td><button class="edit-btn" data-category="${category}" data-index="${index}">Editar</button></td>
          <td><button class="delete-btn" data-category="${category}" data-index="${index}">Eliminar</button></td>
        `;
        tableBody.appendChild(row);
      });
      bindTableActions(); // Re-bindea las acciones de la tabla
    });
  });
}

function bindTableActions() {
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      const index = btn.dataset.index;
      const nuevoValor = prompt('Nuevo valor:', datos[category][index]);
      if (nuevoValor) {
        datos[category][index] = nuevoValor;
        renderTable(category);
      }
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      const index = btn.dataset.index;
      datos[category].splice(index, 1);
      renderTable(category);
    });
  });
}
