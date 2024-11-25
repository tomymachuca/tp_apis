import React from "react";
import cabra from '../../Img/ricci.jpg';
import magu from '../../Img/magu.jpg';
import tomas from '../../Img/machuca.jpg'; // Asegúrate de que esta ruta sea correcta para la imagen de Tomas Machuca

const people = [
    {
        name: 'Marco Riccitelli',
        role: 'Fundador',
        imageUrl: cabra,
    },
    { 
        name: 'Franco Magurno',
        role: 'Fundador',
        imageUrl: magu,
    },
    { 
        name: 'Tomas Machuca',
        role: 'Fundador',
        imageUrl: tomas,
    }
];

export default function Example() {
    return (
        <div className="bg-blue-100 py-24 sm:py-32"> {/* Background changed to a soft blue */}
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              {/* Ajustando el tamaño de los textos y clases */}
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Conoce nuestro equipo</h2> 
              <p className="mt-6 text-lg leading-8 text-gray-800">
                  Somos un equipo comprometido con la innovación, creando soluciones simples y efectivas para mejorar tu experiencia digital.
              </p>

          </div>
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img alt="" src={person.imageUrl} className="h-16 w-16 rounded-full ring-4 ring-blue-300" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-800">{person.name}</h3> {/* Darker gray text */}
                                    <p className="text-sm font-semibold leading-6 text-blue-600">{person.role}</p> {/* Blue text */}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}