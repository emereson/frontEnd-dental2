import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense, useRef, useState } from 'react';

const Mandibular = ({
  setSelectDiente,
  listaTratamientos,
  selectPaciente,
}) => {
  const fechaActual = new Date().getFullYear();
  const fechaNacimiento = new Date(
    selectPaciente?.fechaDeNacimiento
  ).getFullYear();

  const groupRefIzquierdo = useRef();
  const groupRefDerecho = useRef();

  const mandibularIzquierdo = [];
  const esMayorDe14 = fechaActual - fechaNacimiento > 14;

  // Definir los límites para los dientes mandibulares izquierdos
  let limiteSuperior = esMayorDe14 ? 48 : 45;

  for (let i = 41; i <= limiteSuperior; i++) {
    mandibularIzquierdo.push({
      id: esMayorDe14 ? i : i + 40,
      codigoDiente: esMayorDe14 ? i : i + 40,
      dienteGlb: `/dientes3d/${i}.glb`,
    });
  }

  let limiteSuperiorDerecho = esMayorDe14 ? 38 : 35;

  const mandibularDerecho = [];
  for (let i = 31; i <= limiteSuperiorDerecho; i++) {
    mandibularDerecho.push({
      id: esMayorDe14 ? i : i + 40,
      codigoDiente: esMayorDe14 ? i : i + 40,
      dienteGlb: `/dientes3d/${i}.glb`,
    });
  }

  return (
    <div className="cardDiente__container">
      <Canvas camera={{ position: [0, 0, 5], fov: 5.5 }}>
        <ambientLight intensity={0.5} />
        <OrbitControls />

        <group ref={groupRefIzquierdo} position={[-0.1, 0, 0]}>
          <pointLight
            color="white"
            position={[0.8, 0.0, 0.2]}
            intensity={1}
            decay={1.5} // Ajusta el decay según lo necesites
          />
          <pointLight
            color="white"
            position={[-0.8, 0.0, 0.2]}
            intensity={1}
            decay={1.2} // Ajusta el decay según lo necesites
          />
          <pointLight
            color="white"
            position={[0.25, 0.01, 0.2]}
            intensity={1}
            decay={1.2} // Ajusta el decay según lo necesites
          />
          <pointLight
            color="white"
            position={[-0.25, 0.01, 0.2]}
            intensity={1}
            decay={1.5} // Ajusta el decay según lo necesites
          />
          <pointLight
            color="white"
            position={[-0.4, 0, -1]}
            intensity={8}
            decay={1.5} // Ajusta el decay según lo necesites
          />
          {mandibularIzquierdo.map((diente, index) => (
            <Suspense key={`izquierdo-${index}`} fallback={null}>
              <DienteIzquierdo
                dienteGlb={diente.dienteGlb}
                position={[index * -0.12, 0, 0]}
                diente={diente}
                setSelectDiente={setSelectDiente}
                listaTratamientos={listaTratamientos}
              />
            </Suspense>
          ))}
        </group>

        <group ref={groupRefDerecho} position={[0, 0, 0]}>
          {mandibularDerecho.map((diente, index) => (
            <Suspense key={`derecho-${index}`} fallback={null}>
              <DienteDerecho
                dienteGlb={diente.dienteGlb}
                position={[index * 0.12, 0, 0]}
                diente={diente}
                setSelectDiente={setSelectDiente}
                listaTratamientos={listaTratamientos}
              />
            </Suspense>
          ))}
        </group>
      </Canvas>
    </div>
  );
};

const DienteIzquierdo = ({
  dienteGlb,
  position,
  diente,
  setSelectDiente,
  listaTratamientos,
}) => {
  const { scene } = useGLTF(dienteGlb);
  const [pasarCursor, setPasarCursor] = useState();

  const handleMouseEnter = () => {
    setPasarCursor(diente);
  };

  const handleMouseLeave = () => {
    setPasarCursor();
  };
  return (
    <group
      position={position}
      onClick={() => setSelectDiente(diente)}
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
    >
      <primitive object={scene} />
      {pasarCursor?.id === diente.id ||
      listaTratamientos.some(
        (item) => Number(item.codigoDiente) === diente.codigoDiente
      ) ? (
        <pointLight
          color="blue"
          position={[0, -0.05, 0.12]}
          intensity={15}
          decay={1} // Ajusta el decay según lo necesites
          distance={0.13} //
        />
      ) : (
        ''
      )}
    </group>
  );
};

const DienteDerecho = ({
  dienteGlb,
  position,
  diente,
  setSelectDiente,
  listaTratamientos,
}) => {
  const { scene } = useGLTF(dienteGlb);
  const [pasarCursor, setPasarCursor] = useState();

  const handleMouseEnter = () => {
    setPasarCursor(diente);
  };

  const handleMouseLeave = () => {
    setPasarCursor();
  };

  return (
    <group
      position={position}
      onClick={() => setSelectDiente(diente)}
      onPointerEnter={handleMouseEnter}
      onPointerLeave={handleMouseLeave}
    >
      <primitive object={scene} />

      {pasarCursor?.id === diente.id ||
      listaTratamientos.some(
        (item) => Number(item.codigoDiente) === diente.codigoDiente
      ) ? (
        <pointLight
          color="blue"
          position={[0, -0.02, 0.12]}
          intensity={15}
          decay={1} // Ajusta el decay según lo necesites
          distance={0.13} //
        />
      ) : (
        ''
      )}
    </group>
  );
};

export default Mandibular;
