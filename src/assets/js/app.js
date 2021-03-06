
function startForm(){
  const form      = document.querySelector( 'form' ),
        inputs    = form.querySelectorAll( 'input' ),
        btnC      = form.querySelectorAll( 'button[data-inp="continue"]'),
        btnStart  = form.querySelectorAll( 'button[data-inp="start"]'),
        spans     = form.querySelectorAll('span[data-span]')
        fieldsset = form.querySelectorAll( 'fieldset' ),
        regex     = {
          credit_card: /^(([0-9]{4}) ([0-9]{4}) ([0-9]{4}) ([0-9]{4})( ?))$/,
          phone: /^([0-9]{2}) ([0-9]{2}) ([0-9]{2}) ([0-9]{2}) ([0-9]{2})( ?)$/,
          email: /^(.)+@(.)+\.(.)+$/,
          confirm_email: /^(.)+@(.)+\.(.)+$/
        },
        check     = {
          credit_card: false,
          phone: false,
          email: false,
          confirm_email: false,
          body: {
            credit_card: '',
            phone: '',
            email: '',
            promotion: ''
          },
          transform_c_card: []
        },
        check2    = {
          promotion: false
        }
        
    const addSpaceToNumbers = ( number = 4, string ) => {
      const regex = new RegExp( `[0-9]{${ number }}`, 'gi' )
      return string.replace( /\s+/gi, '').replace( regex, '$& ' )
    }
    const addSpaceToBullets = ( number, string ) => {
      const regex = new RegExp( `•{${ number }}`, 'gi' )
      return string.replace( /\s+/gi, '' ).replace( regex, '$& ')
    }
    const useRegexToCheck = ( input, regex, value ) =>{
      if( !regex.test( value ) ){
        check[ input.name ] = false
        input.classList.add( 'error' )
      }else{
        check[ input.name ] = true
        input.classList.remove( 'error' )
      }
    }
    const buttonActive = () => {
      return form.querySelector(' fieldset.active button')
    }
    const checkPromotion = value => {
      const btn = buttonActive()
      if( value ){
        btn.classList.add( 'active' )
        btn.disabled = false
        check.body.promotion = value
      }else{
        btn.classList.remove( 'active' )
        btn.disabled = true
      }
    }
    const checkEachInput = ( e ) => {
      const { key, target } = e
      switch( target.name ){
        case 'credit_card':
          let toArray = []
          if( key === 'Backspace' || key === 'Delete' ){
              toArray = [ ...target.value ]
              .filter( num => num !== ' ' )
            if( toArray.length < check.transform_c_card.length ){
              check.transform_c_card = check.transform_c_card.slice( 0, toArray.length )
            }
            useRegexToCheck( 
              target, 
              regex[ target.name ], 
              addSpaceToNumbers( 
                4, 
                check.transform_c_card.join( '' ) 
              ) 
            )
            check.body[ target.name ] = addSpaceToNumbers( 
              4, 
              check.transform_c_card.join( '' ) 
            )
          }else{
              toArray = [ ...target.value ]
              .filter( num => num !== ' ' )
              .map( ( num2, idx ) =>{
                if( num2 !== '•' ){
                  check.transform_c_card[ idx ] = num2
                }
                return '•'
              })
              .join( '' )

            target.value = addSpaceToBullets( 4, toArray )
            
            useRegexToCheck( 
              target, 
              regex[ target.name ], 
              addSpaceToNumbers( 4, check.transform_c_card.join( '' ) ) 
            )
            check.body[ target.name ] = addSpaceToNumbers( 
              4, 
              check.transform_c_card.join( '' ) 
            )
          }
          return
        case 'phone':
          if( key === 'Backspace' || key === 'Delete'){
            useRegexToCheck( target , regex[ target.name ], target.value )
            check.body[ target.name ] = target.value
          }else{
            target.value = addSpaceToNumbers( 2, target.value )
            useRegexToCheck( target , regex[ target.name ], target.value )
            check.body[ target.name ] = target.value
          }
          return
        case 'email':
          useRegexToCheck( target, regex[ target.name ], target.value )
          check.body[ target.name ] = target.value
          return
        case 'confirm_email':
          useRegexToCheck( target, regex[ target.name ], target.value )
          check.body[ target.name ] = target.value
          return
        case 'promotion':
          checkPromotion( target.value )
          return
        default :
          return
      }
    }
    const checkFirstInputs= () => {
      const btn = buttonActive()
      for( let inputName in check ){
        if( !check[ inputName ] ){
          btn.disabled = true
          btn.classList.remove( 'active' )
          return 
        }
      }
      if( !( check.body.email === check.body.confirm_email ) ){
        btn.disabled = true
        btn.classList.remove( 'active' )
        return 
      }
      btn.disabled = false
      btn.classList.add( 'active' )
    }
    const hideElement = elm => {
      elm.classList.remove( 'active' )
    }
    const showElement = elm => {
      elm.classList.add( 'active' )
    }
    function changeField( e ){
      e.preventDefault()
      let fatherField = this.parentElement
      fieldsset.forEach( ( fieldset, idx ) => {
        if( fieldset === fatherField ){
          hideElement( fieldset )
          showElement( fieldsset[ ++idx ] )
          return
        }
      })

    }
    const backToStart = e => {
      e.preventDefault()
      fieldsset.forEach( fieldset => fieldset.classList.remove( 'active' ) )
      fieldsset[ 0 ].classList.add( 'active' )
    }
  inputs.forEach( input => 
    input.type !== 'radio'
    ? input.addEventListener( 'keyup', checkEachInput )
    : input.addEventListener( 'input', checkEachInput )
    )
  form.addEventListener( 'keyup', checkFirstInputs )
  btnC.forEach( btn => btn.addEventListener( 'click', changeField ) )
  btnC[ 1 ].addEventListener( 'click', () =>
  spans.forEach( span => {
    const data = span.dataset.span
      span.textContent = check.body[ data ]
    }) 
  )
  btnStart.forEach( btn => btn.addEventListener( 'click', backToStart ) )
  return {
    check
  }
}

window.addEventListener( 'load', e => {
  window.chk = startForm( e )
})