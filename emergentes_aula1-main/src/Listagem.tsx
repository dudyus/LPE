import { useEffect, useState } from "react"
import type { Animal } from "./utils/animalType"

export default function Listagem() {
    const [animais, setAnimais] = useState<Animal[]>([])

    useEffect(() => {
        const dados = localStorage.getItem("animais")
        if (dados) {
            setAnimais(JSON.parse(dados))
        }
    }, [])

    return (
        <div className="max-w-xl mx-auto my-6 p-6 bg-gray-100 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Animais Cadastrados</h3>
            </div>
            {animais.length == 0 ? (
                <p>Nenhum animal cadastrado.</p>
            ) : (
                <ul className="space-y-4">
                    {animais.map((animal, i) => (
                        <li key={i} className="bg-white p-4 rounded shadow">
                            <p><strong>Nome:</strong> {animal.nome}</p>
                            <p><strong>Raca:</strong> {animal.raca}</p>
                            <p><strong>Idade:</strong> {Number(animal.idade)}</p>
                            {animal.urlImagem && (
                                <img src={animal.urlImagem} alt={`Imagem de ${animal.nome}`} className="mt-2 w-full rounded" />
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}