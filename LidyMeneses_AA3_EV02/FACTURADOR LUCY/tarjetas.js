document.addEventListener('DOMContentLoaded', () => {
    // Datos de ejemplo pegados directamente en el código
    const data = 
    `FECHA DE INICIO;HORA;JUEGO;CANTIDAD;VALOR;DESCRIPCION;Nombreimagen
24/08/2024;12:29:18 p. m.;ZOMBIES;4;35000;Fabuloso juego de zombies para jugar con hasta 4 jugadores deberas sobrevivir a oleadas de zombies para ganar;zombie.jpg
24/08/2024;12:00:00 a. m.;HAMBURGUESAS;4;15000;COCINA CON TU FAMILIA EN VEZX DE COCINA EN CASA XD;hamburguesa.jpg
25/08/2024;1:00:00 a. m.;BOXEO;4;35000;Fabuloso juego de zombies para jugar con hasta 4 jugadores deberas sobrevivir a oleadas de zombies para ganar;creed.jpg
26/08/2024;2:00:00 a. m.;BOXEO2;4;35000;COCINA CON TU FAMILIA EN VEZX DE COCINA EN CASA XD;creed.jpg
27/08/2024;3:00:00 a. m.;OVERKILL;4;35000;Fabuloso juego de zombies para jugar con hasta 4 jugadores deberas sobrevivir a oleadas de zombies para ganar;overkill.jpg
28/08/2024;4:00:00 a. m.;RAKET;4;35000;COCINA CON TU FAMILIA EN VEZX DE COCINA EN CASA XD;raket.jpg
29/08/2024;5:00:00 a. m.;DEMEO1;4;35000;Fabuloso juego de zombies para jugar con hasta 4 jugadores deberas sobrevivir a oleadas de zombies para ganar;Demeo.jpg
30/08/2024;6:00:00 a. m.;ZOBIE;4;35000;COCINA CON TU FAMILIA EN VEZX DE COCINA EN CASA XD;zombie.jpg
31/08/2024;7:00:00 a. m.;OVERKILL;4;35000;Fabuloso juego de zombies para jugar con hasta 4 jugadores deberas sobrevivir a oleadas de zombies para ganar;overkill.jpg
1/09/2024;8:00:00 a. m.;HAMBURGUESAS2;4;35000;Fabuloso juego de zombies para jugar con hasta 4 jugadores deberas sobrevivir a oleadas de zombies para ganar;hamburguesa.jpg
2/09/2024;9:00:00 a. m.;RAKET;4;35000;COCINA CON TU FAMILIA EN VEZX DE COCINA EN CASA XD;raket.jpg
24/08/2024;12:00:00 a. m.;HAMBURGUESAS3;4;15000;COCINA CON TU FAMILIA EN VEZX DE COCINA EN CASA XD;hamburguesa.jpg
25/08/2024;1:00:00 a. m.;BOXEO3;4;35000;Fabuloso juego de zombies para jugar con hasta 4 jugadores deberas sobrevivir a oleadas de zombies para ganar;creed.jpg
26/08/2024;2:00:00 a. m.;BOXEO4;4;35000;COCINA CON TU FAMILIA EN VEZX DE COCINA EN CASA XD;creed.jpg
27/08/2024;3:00:00 a. m.;OVERKILL1;4;35000;Fabuloso juego de zombies para jugar con hasta 4 jugadores deberas sobrevivir a oleadas de zombies para ganar;overkill.jpg
28/08/2024;4:00:00 a. m.;RAKET2;4;35000;COCINA CON TU FAMILIA EN VEZX DE COCINA EN CASA XD;raket.jpg
29/08/2024;5:00:00 a. m.;DEMEO2;4;35000;Fabuloso juego de zombies para jugar con hasta 4 jugadores deberas sobrevivir a oleadas de zombies para ganar;Demeo.jpg
30/08/2024;6:00:00 a. m.;ZOBIE2;4;35000;COCINA CON TU FAMILIA EN VEZX DE COCINA EN CASA XD;zombie.jpg
31/08/2024;7:00:00 a. m.;OVERKILL3;4;35000;Fabuloso juego de zombies para jugar con hasta 4 jugadores deberas sobrevivir a oleadas de zombies para ganar;overkill.jpg
1/09/2024;8:00:00 a. m.;HAMBURGUESAS4;4;35000;Fabuloso juego de zombies para jugar con hasta 4 jugadores deberas sobrevivir a oleadas de zombies para ganar;hamburguesa.jpg
`;

  // Procesar los datos para crear tarjetas
  processData(data);

  // Evento para el botón "Pagar"
  const payButton = document.getElementById('pay-button');
  if (payButton) {
      payButton.addEventListener('click', () => {
          // Guardar los juegos seleccionados antes de redirigir
          saveSelectedGames();
          // Redirigir a la página de facturación
          window.location.href = 'facturacion.html';
      });
  }
});

function processData(inputData) {
  const rows = inputData.trim().split('\n').slice(1); // Saltar el encabezado

  const container = document.getElementById('carousel');
  container.innerHTML = ''; // Limpiar cualquier contenido previo en el contenedor

  rows.forEach(row => {
      const [fechaInicio, hora, juego, cantidad, valor, descripcion, nombreImagen] = row.split(';');

      if (fechaInicio && hora && juego && cantidad && valor && descripcion && nombreImagen) {
          const card = document.createElement('div');
          card.className = 'card carousel-item'; 
          card.style.width = '18rem';

          card.innerHTML = `
              <img src="${nombreImagen}" class="card-img-top" alt="${juego}">
              <div class="card-body">
                  <h5 class="card-title">${juego}</h5>
                  <p class="card-text">${descripcion}</p>
                  <p><strong>Fecha:</strong> ${fechaInicio}</p>
                  <p><strong>Hora:</strong> ${hora}</p>
                  <p><strong>Valor:</strong> $${parseFloat(valor).toFixed(2)}</p>
                  <p><strong>Cantidad Disponible:</strong> ${cantidad}</p>
                  <div class="btn-container">
                      <button onclick="changeQuantity('${juego}', -1)">-</button>
                      <span id="${juego}-quantity" data-max="${cantidad}">0</span> 
                      <button onclick="changeQuantity('${juego}', 1)">+</button>
                  </div>
              </div>
          `;

          container.appendChild(card);
      }
  });
}

function changeQuantity(juego, change) {
  const quantitySpan = document.getElementById(`${juego}-quantity`);
  let quantity = parseInt(quantitySpan.textContent, 10);
  const maxQuantity = parseInt(quantitySpan.dataset.max, 10); 

  if (change < 0 && quantity > 0) {
      quantity += change;
  } else if (change > 0 && quantity < maxQuantity) {
      quantity += change;
  }

  quantitySpan.textContent = quantity;

  saveSelectedGames();
}

function saveSelectedGames() {
    const selectedGames = [];
    const quantities = document.querySelectorAll('[id$="-quantity"]');

    quantities.forEach(quantitySpan => {
        const quantity = parseInt(quantitySpan.textContent, 10);
        if (quantity > 0) {
            const juego = quantitySpan.id.replace('-quantity', '');
            const card = quantitySpan.closest('.card');
            
            if (card) {
                const fechaInicioElement = card.querySelector('p:nth-child(4)');
                const horaElement = card.querySelector('p:nth-child(5)');
                const valorElement = card.querySelector('p:nth-child(7)');

                const fechaInicio = fechaInicioElement ? fechaInicioElement.textContent.replace('Fecha: ', '') : 'Desconocida';
                const hora = horaElement ? horaElement.textContent.replace('Hora: ', '') : 'Desconocida';
                const valorText = valorElement ? valorElement.textContent.replace('Valor: $', '').replace('$', '') : '0';

                const valor = parseFloat(valorText);

                selectedGames.push({
                    fechaInicio,
                    hora,
                    juego,
                    cantidad: quantity,
                    valor: valor,
                    subtotal: valor * quantity // Calcular el subtotal
                });
            }
        }
    });

    localStorage.setItem('selectedGames', JSON.stringify(selectedGames));
}
