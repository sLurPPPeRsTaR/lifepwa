import { trans } from '@cp-util/trans';
import locale from './locale';
import { Calender, Close } from '@cp-config/Svgs';
import { Input, Button, Modal } from '@cp-component';
import propTypes from 'prop-types'
export default function ModalAccessCode({
	lang,
	onSubmit,
	onChange,
	errMsg,
	onClose,
	isOpen,
}) {
	return (
		<Modal isOpen={isOpen}>
			<div className="px-2">
				<div className="relative mb-5">
					<button
						className="absolute top-0 left-0"
						onClick={onClose}>
						<img src={Close} />
					</button>
					<h1 className="text-lg font-bold text-center">{trans(locale, lang, 'titleModal')}</h1>
				</div>
				<div className="flex flex-col justify-center items-center mb-4">
					<div>
						<img src={Calender} style={{ width: '115px' }} />
					</div>
					<p className="text-center text-caption1 text-neutral-dark-neutral200">
						{trans(locale, lang, 'textBodyModal')}
					</p>
				</div>
				<div>
					<h1 className="text-sm font-bold mb-2">{trans(locale, lang, 'labelInputAccessCode')}</h1>
					<div className="mb-4">
						<Input
							role="input"
							placeholder={trans(locale, lang, 'ModalInputPlaceHolder')}
							handleOnChange={onChange}
							message={errMsg}
						/>
					</div>
					<div>
						<Button
							type="linear-gradient"
							full
							onButtonClick={onSubmit}
						>
							<p className="text-sm">{trans(locale, lang, 'buttonModalSubmitAccessCode')}</p>
						</Button>
					</div>
				</div>
			</div>
		</Modal>
	)
}

ModalAccessCode.defaultProps = {
	lang: 'id',
	onSubmit: () => {},
	onChange: () => {},
	errMsg: null,
	onClose: () => {},
	isOpen: true
}

ModalAccessCode.propTypes = {
	lang: propTypes.oneOf(['id', 'en']),
	onSubmit: propTypes.func,
	onChange: propTypes.func,
	errMsg: propTypes.object,
	onClose: propTypes.func,
	isOpen: propTypes.bool
}

