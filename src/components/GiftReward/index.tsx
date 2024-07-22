import './styles.css'


export default function GiftReward({ reward, onClose }: { reward: string; onClose: () => void }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5 d-flex justify-content-center">
          <div className="box">
            <div className="box-body">
              <div className='reward'>
                {
                  reward == 'pdf' ?
                    <a style={{ color: "white" }} href='/aso.pdf'>
                      Advanced <br /> ASO <br /> Book
                    </a>
                    :
                    <b onClick={onClose}>
                      Discount <br />
                      70%
                    </b>
                }

              </div>
              <div className="box-lid">

                <div className="box-bowtie"></div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
