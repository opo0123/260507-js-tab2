window.addEventListener("load", () => {
  // 요소 선택
  const cup = document.getElementById("cup");
  const smallPic = document.querySelectorAll(".small");
  const viewBtn = document.getElementById("view");
  const detail = document.getElementById("detail");

  // 바뀌는 정보 (내용)
  const descName = document.getElementById("desc-name");
  const descPrice = document.getElementById("desc-price");
  const descDelivery = document.getElementById("desc-delivery");
  const descPoints = document.getElementById("desc-points");
  const descRoasting = document.getElementById("desc-roasting");

  // 바뀌는 정보 (상세보기)
  const detailOrigin = document.getElementById("detail-origin");
  const detailRegion = document.getElementById("detail-region");
  const detailFarm = document.getElementById("detail-farm");
  const detailAltitude = document.getElementById("detail-altitude");
  const detailVariety = document.getElementById("detail-variety");
  const detailProcess = document.getElementById("detail-process");
  const detailDescription = document.getElementById("detail-description");
  const flavorNote = document.getElementById("flavor-note");

  // 장바구니 관련
  const addBtn = document.getElementById("desc-btn");
  const cartBox = document.getElementById("cart");
  const totalBox = document.getElementById("total");
  const cartCount = document.getElementById("cart-count");

  // 작은 이미지 클릭 시, 정보 변경 (selected 토글 포함)
  smallPic.forEach((small) => {
    small.addEventListener("click", () => {
      // selected 제거 (초기화)
      smallPic.forEach((s) => {
        s.classList.remove("selected");
      });
      // 클릭한 이미지에 selected 추가
      small.classList.add("selected");
      // 이미지 변경 함수 실행
      changePic(small);
    });
  });

  // changePic() : 큰 이미지 및 정보 변경
  function changePic(el) {
    // console.log(el); // el : 클릭한 작은 이미지

    // 큰 이미지 변경 (재할당)
    cup.src = el.src;

    const price = Number(el.dataset.price.replace(/[^0-9]/g, ""));

    // 내용 변경
    descName.textContent = `상품명 : ${el.dataset.name}`;
    descPrice.textContent = `판매가 : ${el.dataset.price}`;
    descDelivery.textContent = `배송비 : ${el.dataset.delivery}`;
    descPoints.textContent = `적립금 : ${el.dataset.points}`;
    descRoasting.textContent = `로스팅 : ${el.dataset.roasting}`;

    // 상세보기 (내용 변경)
    detailOrigin.textContent = `원산지 : ${el.dataset.origin}`;
    detailRegion.textContent = `지 역 : ${el.dataset.region}`;
    detailFarm.textContent = `농 장 : ${el.dataset.farm}`;
    detailAltitude.textContent = `고 도 : ${el.dataset.altitude}`;
    detailVariety.textContent = `품 종  : ${el.dataset.variety}`;
    detailProcess.textContent = `가공법  : ${el.dataset.process}`;
    detailDescription.textContent = `${el.dataset.description}`;
    flavorNote.textContent = `${el.dataset.flavornote}`;

    // 버튼 데이터 저장
    addBtn.dataset.name = el.dataset.name;
    addBtn.dataset.price = price;
  }

  // 첫 화면 상품 (기본 설정)
  smallPic[0].classList.add("selected");
  changePic(smallPic[0]);

  // 상세보기
  // 상세 설명 보기 클릭 시
  viewBtn.addEventListener("click", () => {
    // block이면 none으로, 아니면 block ( = toggle)
    detail.style.display = detail.style.display === "block" ? "none" : "block";
  });

  // 장바구니
  // 데이터
  let cartItems = {};
  // 장바구니 담기
  addBtn.addEventListener("click", () => {
    const name = addBtn.dataset.name;
    const price = Number(addBtn.dataset.price);
    // console.log(price);

    // 장바구니 추가
    if (!cartItems[name]) {
      cartItems[name] = {
        price: price,
        quantity: 1,
      };
    } else {
      cartItems[name].quantity++;
    }

    // 장바구니 박스 업데이트 (실행 위치)
    updateCart();
  });
  // 장바구니 박스 업데이트 기능
  function updateCart() {
    cartBox.innerHTML = `<strong>🛒 장바구니</strong>`;
    let totalPrice = 0;
    let totalCount = 0;

    for (let key in cartItems) {
      const item = cartItems[key];
      totalPrice += item.price * item.quantity;
      totalCount += item.quantity;

      const p = document.createElement("p");
      p.textContent = `${key} - ${item.price.toLocaleString()}원 X ${item.quantity}`;
      cartBox.appendChild(p);
    }

    // 총합
    totalBox.textContent = `총 합계 : ${totalPrice.toLocaleString()}원`;
    cartCount.textContent = totalCount;
    // console.log(totalPrice);
    // console.log(totalCount);
  }
});
