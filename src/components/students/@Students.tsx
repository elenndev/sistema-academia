import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../stores/appStore"
import { setLoading } from "../../stores/studentsStore"
import { getAluno } from "../../utils/fetchAPI"
import type { AlunoType } from "../../types/AlunoType";
import { StudentSheet } from "./StudentSheet";

interface studentsProps {
  currentStudentsList: Pick<AlunoType, 'id' | 'nome'>[];
  setError: ( error: {
    message: string;
    callback: ()=> Promise<void> | void;
  }) => void;
}
export const Students = ({ setError,currentStudentsList } : studentsProps) => {
  // false => nenhuma ficha de aluno aberta, mostrar lista normalmente
  // null => tentou abrir a ficha mas nenhum aluno com aquele id foi retornado 
  const [openStudent, setOpenStudent] = useState<AlunoType | null | false>(false)

  const loading = useAppSelector((state)=> state.students.loading)
  const dispatch = useAppDispatch()

  async function openStudentSheet(id: string){
    dispatch(setLoading("Buscando dados do aluno"))
    try{
      const req = await getAluno(id)
      if(req){
        dispatch(setLoading(false))
        setOpenStudent(req)
      } else {
        setOpenStudent(null)
      }
    }catch(error){
      const errorMessage = error instanceof Error? error.message : "Erro na requisição para buscar a lista de alunos"
      setError({
        message: errorMessage, 
        callback: () => {openStudentSheet(id)}})
    }
  }

  function closeStudentSheet(){
    setOpenStudent(false)
  }


  return (
    <>
      { loading ? 
        <div className="loading-text">
          <p>{loading}</p>
        </div>
      : <>        
        {openStudent ? <>
          <button type="button"
          onClick={closeStudentSheet}>
            Voltar para a lista de alunos
          </button>
          <StudentSheet student={openStudent}/>
        </>
        : openStudent !== false ? <p>Não foi encontrado nenhum aluno com o id informado</p> 
        : 
        <>
        {currentStudentsList.length > 0 ? 
          <table className="students-list">
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {currentStudentsList.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.nome}</td>
                  <td className="student-actions">
                    <button 
                    type='button'
                    onClick={()=>openStudentSheet(student.id)}>
                      Abrir ficha
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          : <p>Não há nenhum aluno registrado</p>}
          </>
        }
        </>
      }
    </>
  )
}