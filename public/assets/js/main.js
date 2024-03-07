document.addEventListener('DOMContentLoaded', function () {
    const cuentaForm = document.getElementById('cuentaForm');
    const cuentasTableBody = document.getElementById('cuentasTableBody');
    const btnGuardar = document.getElementById('guardar');
    const btnCancelar = document.getElementById('cancelar');
    const alertPlaceholder = document.getElementById('alertPlaceholder');

    btnGuardar.addEventListener('click', function () {
        saveCuenta()
    });

    btnCancelar.addEventListener('click', function () {
        cuentaForm.reset();
        btnGuardar.textContent = 'Guardar';
        btnGuardar.classList.remove('btn-success');
        btnGuardar.classList.add('btn-primary');
        cuentaForm.removeAttribute('data-cuenta-id'); // Remueve el atributo para asegurar que el próximo uso sea para crear una nueva cuenta

        const numeroCuentaInput = cuentaForm.querySelector('#numeroCuenta');
        numeroCuentaInput.disabled = false; // Deshabilita el campo de entrada de texto
        fetchCuentas();
    });

    function showAlert(message, type) {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `<div class="alert alert-${type} alert-dismissible" role="alert">${message}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;

        alertPlaceholder.append(wrapper);
        setTimeout(() => wrapper.remove(), 3000);
    }

    function fetchCuentas() {
        fetch('/cuentas')
            .then(response => response.json())
            .then(data => {
                cuentasTableBody.innerHTML = ''; // Limpia la tabla antes de agregar nuevas filas
                let maxId = data.reduce((max, cuenta) => Math.max(max, cuenta.numero_cuenta), -1); // Encuentra el máximo número de cuenta


                data.forEach(cuenta => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                    <td>${cuenta.numero_cuenta}</td>
                    <td>${cuenta.balance}</td>
                    <td class="text-end">
                        <button class="btn btn-primary btn-edit " data-id="${cuenta.numero_cuenta}">
                        <i class="bi bi-pencil-square me-2"></i> Editar</button>
                        <button class="btn btn-danger btn-delete" data-id="${cuenta.numero_cuenta}">
                        <i class="bi bi-trash-fill  me-2"></i> Eliminar</button>
                    </td>
                `;
                    cuentasTableBody.appendChild(row);

                    // Encuentra los botones recién creados
                    const btnEdit = row.querySelector('.btn-edit');
                    const btnDelete = row.querySelector('.btn-delete');

                    // Añade event listeners a los botones
                    btnEdit.addEventListener('click', () => editCuenta(cuenta.numero_cuenta));
                    btnDelete.addEventListener('click', () => {
                        const deleteModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
                        const confirmDeleteBtn = document.getElementById('confirmDelete');

                        // Asegurarse de eliminar event listeners anteriores para evitar múltiples llamadas
                        const newConfirmDeleteBtn = confirmDeleteBtn.cloneNode(true);
                        confirmDeleteBtn.parentNode.replaceChild(newConfirmDeleteBtn, confirmDeleteBtn);

                        // Añadir event listener para el botón de confirmar en el modal
                        newConfirmDeleteBtn.addEventListener('click', () => {
                            deleteCuenta(cuenta.numero_cuenta);
                            deleteModal.hide();
                        });

                        deleteModal.show();
                    });
                    const newId = maxId + 1;
                    document.getElementById('numeroCuenta').value = newId;

                });
            })
            .catch(error => console.error('Error al cargar cuentas:', error));
    }



    function saveCuenta() {
        const numeroCuenta = cuentaForm.querySelector('#numeroCuenta').value;
        const balance = cuentaForm.querySelector('#balance').value;
        const cuentaId = cuentaForm.getAttribute('data-cuenta-id');

        const method = cuentaId ? 'PUT' : 'POST';
        const url = cuentaId ? `/cuentas/${cuentaId}` : '/cuentas';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ balance: balance, numeroCuenta: numeroCuenta }),
        })
            .then(response => response.json())
            .then(data => {
                showAlert('Cuenta guardada con éxito.', 'success');
                fetchCuentas();
                cuentaForm.reset();
                cuentaForm.removeAttribute('data-cuenta-id');
            })
            .catch(error => showAlert('Error al guardar la cuenta.', 'danger'));
    }


    function deleteCuenta(id) {
        fetch(`/cuentas/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar cuenta');
                }
                showAlert('Cuenta eliminada con éxito.', 'success');
                fetchCuentas();
            })
            .catch(error => showAlert('Error al eliminar la cuenta.', 'danger'));
    }

    function editCuenta(id) {
        const cuenta = document.querySelector(`button[data-id="${id}"]`).parentNode.parentNode;
        const numeroCuenta = cuenta.cells[0].textContent;
        const balance = cuenta.cells[1].textContent;

        const numeroCuentaInput = cuentaForm.querySelector('#numeroCuenta');
        numeroCuentaInput.value = numeroCuenta;
        numeroCuentaInput.disabled = true; // Deshabilita el campo de entrada de texto

        cuentaForm.querySelector('#balance').value = balance;
        cuentaForm.setAttribute('data-cuenta-id', id);

        // Cambiar el texto y la clase del botón Guardar a Actualizar y btn-success
        const btnGuardar = document.getElementById('guardar');
        btnGuardar.innerHTML = '<i class="bi bi-pencil-fill"></i> Actualizar'; // Agrega el icono de editar y el texto Actualizar
        btnGuardar.classList.remove('btn-primary');
        btnGuardar.classList.add('btn-success');



    }


    fetchCuentas();


    // Inicializar todos los tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });


});


document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.btn-edit').forEach(btn => {
        console.log(btn.getAttribute('data-id'));
        btn.addEventListener('click', () => editCuenta(btn.getAttribute('data-id')));
    });
    document.querySelectorAll('.btn-delete').forEach(btn => {
        console.log(btn.getAttribute('data-id'));
        btn.addEventListener('click', () => deleteCuenta(btn.getAttribute('data-id')));
    });
});