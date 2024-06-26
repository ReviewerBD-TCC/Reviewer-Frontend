import { cardFormProps } from 'interfaces/FormInterfaces/CardForm'

const DashboardCardForm: React.FC<cardFormProps> = ({titleForm, id, className, onClick, subTitle}: cardFormProps) => {
  return (
    <div>
      <div onClick={onClick} className={`bg-boschLightGray w-full min-h-[3.8rem] p-4 flex-col flex ${className}`}>
        <h2 className='font-bold text-xl'>
            {titleForm}
        </h2>
        {
          subTitle ? (
          <h2>
          <span>Referente a:</span> <span className='text-boschBlue text-base font-bold'> {subTitle} </span>
        </h2>) : <p></p>
        }
      </div>
    </div>
  )
}
 
export default DashboardCardForm