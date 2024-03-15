export function drawTable(context: CanvasRenderingContext2D) {
  const gradient = context.createLinearGradient(0, 0, 0, 500);
  gradient.addColorStop(0, "#006400");
  gradient.addColorStop(1, "#008000");

  // Рисуем стол с градиентным фоном
  context.fillStyle = gradient;
  context.fillRect(50, 50, 700, 400);

  // Рисуем бортики стола
  context.fillStyle = "#603000";
  context.fillRect(40, 40, 720, 10);
  context.fillRect(40, 40, 10, 420);
  context.fillRect(750, 40, 10, 420);
  context.fillRect(40, 450, 720, 10);

  // Добавляю бортикам детали
  context.strokeStyle = "#42210B";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(40, 40);
  context.lineTo(760, 40);
  context.moveTo(40, 40);
  context.lineTo(40, 460);
  context.moveTo(40, 460);
  context.lineTo(760, 460);
  context.moveTo(760, 40);
  context.lineTo(760, 460);
  context.stroke();

  // // Рисуем лузы
  context.fillStyle = "#000000";
  context.beginPath();
  context.arc(50, 50, 20, 0, 2 * Math.PI);
  context.arc(400, 50, 20, 0, 2 * Math.PI);
  context.arc(750, 50, 20, 0, 2 * Math.PI);
  context.fill();
  context.beginPath();
  context.arc(50, 450, 20, 0, 2 * Math.PI);
  context.arc(400, 450, 20, 0, 2 * Math.PI);
  context.arc(750, 450, 20, 0, 2 * Math.PI);
  context.fill();

  // Добавляем тени возле лунок
  context.fillStyle = "rgba(0, 0, 0, 0.1)";
  context.beginPath();
  context.arc(50, 50, 25, 0, 2 * Math.PI);
  context.fill();
  context.beginPath();
  context.arc(400, 50, 25, 0, 2 * Math.PI);
  context.fill();
  context.beginPath();
  context.arc(750, 50, 25, 0, 2 * Math.PI);
  context.fill();
  context.beginPath();
  context.arc(50, 450, 25, 0, 2 * Math.PI);
  context.fill();
  context.beginPath();
  context.arc(400, 450, 25, 0, 2 * Math.PI);
  context.fill();
  context.beginPath();
  context.arc(750, 450, 25, 0, 2 * Math.PI);
  context.fill();
}
