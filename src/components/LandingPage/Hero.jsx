import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Index() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    return (
        <div>
            <dh-component>
                <nav className="bg-blue-900 w-full border-b border-gray-300">
                    <div className="py-5 container mx-auto px-6 flex items-center justify-between">
                        <div aria-label="Home. logo" role="img">
                            <h1 className="text-gray-100 font-bold text-3xl">SliceTicket</h1>
                        </div>
                        <div>
                            <button
                                onClick={() => setShow(!show)}
                                className={`${show ? 'hidden' : ''} sm:block md:hidden text-gray-100 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500`}
                            >
                                <svg
                                    aria-haspopup="true"
                                    aria-label="open Main Menu"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="md:hidden icon icon-tabler icon-tabler-menu"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="#FFFFFF"
                                    fill="none"
                                    strokeLinecap="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1={4} y1={8} x2={20} y2={8} />
                                    <line x1={4} y1={16} x2={20} y2={16} />
                                </svg>
                            </button>

                            <div id="menu" className={` ${show ? '' : 'hidden'} md:block lg:block `}>
                                <button
                                    onClick={() => setShow(!show)}
                                    className="block md:hidden lg:hidden text-gray-100 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 z-30 top-0 mt-6"
                                >
                                    <svg
                                        aria-label="close main menu"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="#FFFFFF"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={18} y1={6} x2={6} y2={18} />
                                        <line x1={6} y1={6} x2={18} y2={18} />
                                    </svg>
                                </button>
                                <ul className="flex text-xl md:text-base items-center md:flex-row justify-center fixed md:relative top-0 bottom-0 left-0 right-0 bg-white md:bg-transparent z-20">
                                    <li className="text-gray-100 hover:text-gray-300 cursor-pointer text-base lg:text-lg md:ml-5 lg:ml-10">
                                        <a href="#testimonials">Testimonios</a>
                                    </li>
                                    <li className="text-gray-100 hover:text-gray-300 cursor-pointer text-base lg:text-lg md:ml-5 lg:ml-10">
                                        <a href="#example">¿Quienes Somos?</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => navigate('/registrarse')}
                                className="focus:outline-none text-lg font-bold focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition duration-150 ease-in-out hover:bg-blue-200 bg-transparent rounded border border-blue-400 text-gray-100 px-4 py-2"
                            >
                                Registrarse
                            </button>
                            <button
                                onClick={() => navigate('/iniciar-sesion')}
                                className="focus:outline-none text-lg font-bold focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition duration-150 ease-in-out hover:bg-blue-200 bg-transparent rounded border border-blue-400 text-gray-100 px-4 py-2"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="bg-blue-100">
                    <div className="container mx-auto flex flex-col items-center py-12 sm:py-24">
                        <div className="w-11/12 sm:w-2/3 lg:flex justify-center items-center flex-col mb-5 sm:mb-10">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center text-blue-900 font-black leading-7 md:leading-10">
                                Divide tus gastos fácilmente con
                                <span className="text-blue-700"> SliceTicket</span>
                            </h1>
                            <p className="mt-5 sm:mt-10 lg:w-10/12 text-gray-700 font-normal text-center text-sm sm:text-lg">
                                SliceTicket hace que dividir los gastos dentro de cualquier grupo sea sencillo y sin estrés.
                            </p>
                        </div>
                        <div className="flex justify-center items-center">
                            <button
                                onClick={() => navigate('/signup')}
                                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 lg:text-xl lg:font-bold  rounded text-white px-4 sm:px-10 border border-indigo-700 py-2 sm:py-4 text-sm"
                            >
                                Empezar
                            </button>
                        </div>
                    </div>
                </div>
            </dh-component>
        </div>
    );
}

export default Index;
