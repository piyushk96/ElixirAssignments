var opr='0', num=0, operator='+', negative=0, decimal=0, result=0, i=1, uncalc=1;

input=function(num)
{
    if(num=='.' && decimal==0)
    {
      decimal=1;
      opr+=num;
      document.getElementById('display').innerHTML=opr;
    }
    else if(num!='.')
    {
      opr+=num;
      document.getElementById('display').innerHTML=parseFloat(opr);
    }
}
operation=function(op)
{
  if(op=='-' && opr==='0')//for negative numbers
  {
    if(negative=='0')
    {
      opr= '-' + '0';
      negative=1;
    }
    else
    {
        opr='0';
    }
    document.getElementById('display').innerHTML=opr;
    return;
  }

  document.getElementById('operatorDisp').innerHTML=op;
  if(i!=1 && uncalc==1)     //whether clculated using = or not
  {                         //i represent opr is first number or not
    calculate();
  }
  result=parseFloat(opr);
  opr='0';
  operator=op;
  negative=0;
  decimal=0;
  i=2;
  uncalc=1;
}
calculate=function()
{
  switch (operator)
  {
    case '+':result+=parseFloat(opr);
    break;
    case '-':result-= parseFloat(opr);
    break;
    case '*':result*=parseFloat(opr);
    break;
    case '/':result/=parseFloat(opr);
    break;
  }
  result=result.toFixed(3);          //select 3 decimal places
  result*=100;                       //round of to two decimal place
  Math.round(result);
  result/=100;
  document.getElementById('display').innerHTML=result;
  opr=result;
  uncalc=0;
}
allClear=function()
{
  document.getElementById('display').innerHTML='';
  document.getElementById('operatorDisp').innerHTML='';
  opr='0';
  result=0;
  operator='+';
  negative=0;
  decimal=0;
  i=1;
  uncalc=1;
  num=0;
}
