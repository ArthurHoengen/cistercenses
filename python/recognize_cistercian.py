import sys
import os
import cv2
import numpy as np

IMG_WIDTH = 160
IMG_HEIGHT = 260
PADDING = 20

def identificar_quadrante(x1, y1, x2, y2, cx, cy, margem):
    xm = (x1 + x2) / 2
    ym = (y1 + y2) / 2
    if ym < cy - margem:
        if xm < cx - margem:
            return "dezena"
        elif xm > cx + margem:
            return "unidade"
    elif ym > cy + margem:
        if xm < cx - margem:
            return "milhar"
        elif xm > cx + margem:
            return "centena"
    return None

def identificar_valor_por_quadrante(quadrantes):
    valores = {"milhar": 0, "centena": 0, "dezena": 0, "unidade": 0}
    mapeamento_potencia = {"unidade": 0, "dezena": 1, "centena": 2, "milhar": 3}
    for quad, linhas in quadrantes.items():
        qtd = len(linhas)
        if 1 <= qtd <= 9:
            valores[quad] = qtd * (10 ** mapeamento_potencia[quad])
    return sum(valores.values())

def detectar_cisterciense(imagem_path):
    img = cv2.imread(imagem_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        print(f"Erro ao carregar a imagem: {imagem_path}", file=sys.stderr)
        return 0

    blurred = cv2.GaussianBlur(img, (5, 5), 0)
    _, bin_img = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

    edges = cv2.Canny(bin_img, 50, 150, apertureSize=3)
    linhas = cv2.HoughLinesP(edges, 1, np.pi / 180, threshold=15, minLineLength=5, maxLineGap=10)

    h, w = bin_img.shape
    cx, cy = w // 2, h // 2
    margem = int(min(w, h) * 0.05)  # aumentei a margem

    quadrantes = {"milhar": [], "centena": [], "dezena": [], "unidade": []}

    if linhas is not None:
        for linha in linhas:
            x1, y1, x2, y2 = linha[0]
            quad = identificar_quadrante(x1, y1, x2, y2, cx, cy, margem)
            if quad:
                quadrantes[quad].append(((x1, y1), (x2, y2)))

    # Debug: mostrar linhas detectadas
    # mostrar_linhas(img, linhas)

    return identificar_valor_por_quadrante(quadrantes)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python recognize_cistercian.py <caminho_da_imagem>", file=sys.stderr)
        sys.exit(1)

    imagem_path = sys.argv[1]
    if not os.path.exists(imagem_path):
        print(f"Arquivo não encontrado: {imagem_path}", file=sys.stderr)
        sys.exit(1)

    numero = detectar_cisterciense(imagem_path)
    print(numero)