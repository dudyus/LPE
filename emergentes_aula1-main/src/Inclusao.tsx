import { useForm } from "react-hook-form"
import type { Animal } from "./utils/animalType"

export default function Inclusao() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Animal>()

  function onSubmit(data: Animal) {
    const dados = localStorage.getItem("animais")
    let grava: Animal[]

    if (dados) {
      const todos: Animal[] = JSON.parse(dados)
      grava = [...todos, data]
    } else {
      grava = [data]  
    }

    localStorage.setItem("animais", JSON.stringify(grava))
    reset()
  }

  return (
    <div className="max-w-xl mx-auto my-6 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Cadastrar Animal</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nome</label>
          <input
            {...register("nome", { required: "Nome obrigatório" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Raça</label>
          <input
            {...register("raca", { required: "Raça obrigatória" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.raca && <span className="text-red-500 text-sm">{errors.raca.message}</span>}
        </div>
        <div>
          <label className="block mb-1 font-medium">Idade</label>
          <input
            type="number"
            {...register("idade", { required: "Idade obrigatória" })}
            className="w-full border rounded px-3 py-2"
          />
          {errors.idade && <span className="text-red-500 text-sm">{errors.idade.message}</span>}
        </div>
        <div>
          <label className="block mb-1 font-medium">URL da imagem</label>
          <input
            {...register("urlImagem", {
              required: "URL obrigatória",
              pattern: { value: /^https?:\/\//, message: "Insira uma URL válida" }
            })}
            className="w-full border rounded px-3 py-2"
            placeholder="Ex: https://..."
          />
          {errors.urlImagem && <span className="text-red-500 text-sm">{errors.urlImagem.message}</span>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
}