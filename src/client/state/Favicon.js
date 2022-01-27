import CinnySVG from "../../../public/res/svg/cinny.svg";

class Favicon {
	constructor(notifications) {
		this.noti = notifications;

		this.highlightNotiCount = 0;
		this.totalNotiCount = 0;
		
		this.iconRef = document.querySelector("head > link[rel=\"icon\"]");
		this.iconSize = 36;

		this.logo = new Image();
		this._applySize(this.logo);
		this.logo.src = CinnySVG;

		this.canvas = document.createElement("canvas");
		this._applySize(this.canvas);

		this.ctx = this.canvas.getContext("2d");

		this.logo.addEventListener("load", () => this._update());
	}

	inc(total, highlight) {
		const prev = this.highlightNotiCount;
		this.totalNotiCount += total;
		this.highlightNotiCount += highlight;
		if (prev < 10 && this.highlightNotiCount < 10) {
			this._update();
		}
	}

	dec(total, highlight) {
		this.inc(total * -1, highlight * -1)
	}

	async _update() {
		if (this.totalNotiCount == 0) {
			this.iconRef.href = CinnySVG;
			return;
		}

		// clear canvas
		this.ctx.clearRect(0, 0, this.iconSize, this.iconSize);
		this.ctx.drawImage(this.logo, 0, 0, this.iconSize, this.iconSize);

		this.ctx.fillStyle = '#f04747';
		this._drawCircle(this.iconSize / 3);

		if (this.highlightNotiCount < 1) {
			this._applyCanvas();
			return;
		}

		this.ctx.fillStyle = "#fff";
		if (this.highlightNotiCount < 10) {
			let position = this.iconSize * 2/3;
			this.ctx.font = `bold 20px sans-serif`;
			this.ctx.textAlign = "center";
			this.ctx.textBaseline = "middle";
			this.ctx.fillText(this.highlightNotiCount, position, position + 1)
		} else {
			this._drawCircle(this.iconSize / 3)
		}

		this._applyCanvas();
	}

	_applyCanvas() {
		this.canvas.toBlob((blob) => {
			// this should never happen but whatever
			if (!blob) {
				this.iconRef.href = CinnySVG;
				return;
			}
			
			URL.revokeObjectURL(this.blob);

			this.blob = URL.createObjectURL(blob);
			this.iconRef.href = this.blob;
		});
	}

	_drawCircle(circleSize) {
		this.ctx.beginPath();
		let position = this.iconSize * 2 / 3;
		this.ctx.arc(position, position, circleSize, 0, 2*Math.PI);
		this.ctx.fill();
	}

	_applySize(element) {
		element.width = this.iconSize;
		element.height = this.iconSize;
	}
}

export default Favicon;