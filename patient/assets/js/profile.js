document.getElementById('profile').addEventListener("click", function()
{ 
  document.querySelector('.profile').style.display = "flex";
  document.querySelector('.payment').style.display = "none";
  document.querySelector('.consultant').style.display = "none";
  document.querySelector('.prescription').style.display = "none";
  document.querySelector('.m_payment').style.display = "none";
  document.querySelector('.c_payment').style.display = "none";
  document.querySelector('.d_payment').style.display = "none";
});
document.getElementById('payment').addEventListener("click", function()
{ 
  document.querySelector('.profile').style.display = "none";
  document.querySelector('.payment').style.display = "flex";
  document.querySelector('.consultant').style.display = "none";
  document.querySelector('.prescription').style.display = "none";
  document.querySelector('.m_payment').style.display = "none";
  document.querySelector('.c_payment').style.display = "flex";
  document.querySelector('.d_payment').style.display = "none";
});
document.getElementById('consultant').addEventListener("click", function()
{ 
  document.querySelector('.profile').style.display = "none";
  document.querySelector('.payment').style.display = "none";
  document.querySelector('.consultant').style.display = "flex";
  document.querySelector('.prescription').style.display = "none";
  document.querySelector('.m_payment').style.display = "none";
  document.querySelector('.c_payment').style.display = "none";
  document.querySelector('.d_payment').style.display = "none";
});
document.getElementById('prescription').addEventListener("click", function()
{ 
  document.querySelector('.profile').style.display = "none";
  document.querySelector('.payment').style.display = "none";
  document.querySelector('.consultant').style.display = "none";
  document.querySelector('.prescription').style.display = "flex";
  document.querySelector('.m_payment').style.display = "none";
  document.querySelector('.c_payment').style.display = "none";
  document.querySelector('.d_payment').style.display = "none";
});
document.getElementById('c_payment').addEventListener("click", function()
{ 
  document.querySelector('.profile').style.display = "none";
  document.querySelector('.payment').style.display = "flex";
  document.querySelector('.consultant').style.display = "none";
  document.querySelector('.prescription').style.display = "none";
  document.querySelector('.d_payment').style.display = "none";
  document.querySelector('.m_payment').style.display = "none";
  document.querySelector('.c_payment').style.display = "flex";
});
document.getElementById('m_payment').addEventListener("click", function()
{ 
  document.querySelector('.profile').style.display = "none";
  document.querySelector('.payment').style.display = "flex";
  document.querySelector('.consultant').style.display = "none";
  document.querySelector('.prescription').style.display = "none";
  document.querySelector('.m_payment').style.display = "flex";
  document.querySelector('.c_payment').style.display = "none";
  document.querySelector('.d_payment').style.display = "none";
});
document.getElementById('d_payment').addEventListener("click", function()
{ 
  document.querySelector('.profile').style.display = "none";
  document.querySelector('.payment').style.display = "flex";
  document.querySelector('.consultant').style.display = "none";
  document.querySelector('.prescription').style.display = "none";
  document.querySelector('.m_payment').style.display = "none";
  document.querySelector('.c_payment').style.display = "none";
  document.querySelector('.d_payment').style.display = "flex";
});
