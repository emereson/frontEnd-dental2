import React from 'react';

const ListaTratamiento = ({
  tratamientosConsulta,
  setTratamientosConsulta,
}) => {
  console.log(tratamientosConsulta);
  return (
    <div
      className={`calendarioSelectPaciente__containerFixed ${
        tratamientosConsulta
          ? ''
          : 'calendarioSelectPaciente__closeContainer'
      }`}
    >
      {tratamientosConsulta ? (
        <div className="calendarioSelectPaciente__container">
          <section className="calendarioSelectPaciente__sectionOne">
            <h2>
              odontograma del tratamiento{' '}
              {tratamientosConsulta?.titulo}
            </h2>
            <article>
              <button
                className="calendarioSelectPaciente__closeButton"
                type="button"
                onClick={() => setTratamientosConsulta()}
              >
                Cerrar
              </button>
            </article>
          </section>

          <table className="table__container">
            <thead>
              <tr>
                <th>Codigo de Diente</th>
                <th>Tramiento</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {tratamientosConsulta?.tratamientoDentals?.map(
                (traamiento) => (
                  <tr key={traamiento.id}>
                    <td>{traamiento.codigoDiente}</td>
                    <td>{traamiento.tratamiento}</td>
                    <td>{traamiento.precio}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
};

export default ListaTratamiento;
