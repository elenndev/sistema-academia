import { useState } from "react";
import type { TreinoType } from "../../types/TreinoType"

interface itemTreinoProps {
  item: TreinoType;
  studentList: string[];
  editing?: {
    handleTreinoChecklist: (e: React.ChangeEvent<HTMLInputElement>, categoria: string) => void;
  }
}
export const ItemTreino = ({ item, editing, studentList } : itemTreinoProps) => {
  const [open, setOpen] = useState(false)
  
  function checkValue(checkExercicio: string){
    const check = studentList.find(exercicio => exercicio === checkExercicio)
    return check ? true : false
  }
  return(
    <div className={`treino-card ${open ? 'open' : 'closed'}`}>
      <p>{item.categoria}</p>
        {open && <>
          {item.exercicios.map(exercicio =>
            <label key={exercicio} className="checklist-square">
            {exercicio}
            <input
              type="checkbox"
              id={exercicio}
              value={exercicio}
              checked={!editing ? true : checkValue(exercicio)}
              disabled={!editing}
              onChange={(e) => editing && editing.handleTreinoChecklist(e, item.categoria)}/>
            <span className="checkmark-square"></span>
            </label>
          )}
        </>}
      <button
      type="button"
      onClick={()=> setOpen(!open)}>
        {open ? 'Fechar' : 'Abrir'}
      </button>
    </div>
  )
}