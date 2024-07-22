import { TColorTheme } from '~hooks/create-app';

export const ColorButtons: TColorTheme[] = [
  { id: 'blue', text: 'blue', backgroundColor: 'blue' },
  { id: 'red', text: 'red', backgroundColor: 'lightRed' },
  { id: 'pink', text: 'pink', backgroundColor: 'pink' },
  { id: 'purple', text: 'purple', backgroundColor: 'purple' },
  { id: 'green', text: 'green', backgroundColor: 'green' },
  { id: 'orange', text: 'orange', backgroundColor: 'orange' },
  { id: 'brown', text: 'beige', backgroundColor: 'beige' },
  { id: 'grey', text: 'grey', backgroundColor: 'buttonGrey' },
] as const;

export const ColorPaletteButtons = {
  blue: {
    colorPrimary: '#2196f3',
    colorPrimaryDark: '#1976D2',
    colorAccent: '#448aff',
  },
  red: {
    colorPrimary: '#f44336',
    colorPrimaryDark: '#b71c1c',
    colorAccent: '#ff5252',
  },
  pink: {
    colorPrimary: '#e91e63',
    colorPrimaryDark: '#ad1457',
    colorAccent: '#ff4081',
  },
  purple: {
    colorPrimary: '#9c27b0',
    colorPrimaryDark: '#4a148c',
    colorAccent: '#e040fb',
  },
  indigo: {
    colorPrimary: '#3f51b5',
    colorPrimaryDark: '#1a237e',
    colorAccent: '#536dfe',
  },
  teal: {
    colorPrimary: '#009688',
    colorPrimaryDark: '#004d40',
    colorAccent: '#00bfa5',
  },
  green: {
    colorPrimary: '#4caf50',
    colorPrimaryDark: '#1b5e20',
    colorAccent: '#00c853',
  },
  yellow: {
    colorPrimary: '#fdd835',
    colorPrimaryDark: '#f57f17',
    colorAccent: '#ffd600',
  },
  orange: {
    colorPrimary: '#ff5722',
    colorPrimaryDark: '#e65100',
    colorAccent: '#ff3d00',
  },
  brown: {
    colorPrimary: '#795548',
    colorPrimaryDark: '#5d4037',
    colorAccent: '#a1887f',
  },
  grey: {
    colorPrimary: '#607d8b',
    colorPrimaryDark: '#37474f',
    colorAccent: '#78909c',
  },
  black: {
    colorPrimary: '#212121',
    colorPrimaryDark: '#000000',
    colorAccent: '#424242',
  },
} as const;

export const APP_ICON_1 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPSSURBVHgB3ZvBTxNBFMZftyUmGBswkqgtUuIBvFVjjIkeMISz1D8AJF4xevHgCTgRbhLxaAwevIJnTeTgwWgiJCRITJRaqpBozFpjI6FQ3zfukHazS7vt7KY7vwRmu7O0+/G+fTM7+xohD6SY3d3dgUgkkuKfnnK53IHdVkuGYXTI7Ubh9zX39/dNazsrW37fL9yuRKPRlSxT9/vVOoA1dZRKpTv8ATchjFoAS/gii52tJdZVoBTGm5PU2kzm8/kpt05HgbDi3t7eK45aikIAIsrRvOYUTcO+g7WlwyQO4FxxzolEIm3vq4pg2CJnxymSVREMszggI4n8IfcdCEwmkxNhFieBBk6Od+VrYVFYk3dukEbEYrFOdqopIlipWBekJiGQL87rpBmsaVS0OtpTwjbtNTjrpElTWNuAwVlHW4HIqEarTKD9AHc8iGAPaQpr6zQoQLoyV+ny+hPRBoSIYIoCoitzpar1G7ZoR2ARPJI4QfFL/WIbbSzeTkFgYJmBAkCKkwRhUyyfGM2uodSL3Zadg+cpAIKxaKU9JUHZNBCBdnGSIGwaiMBTI0OO+4OwaYRvdMvUBCdHh+ho/xnXfvS1n3Pv3/n6gwpv1137i+s52pp/QY3StMCL7x5R7Ji/19Kb/jFqlKYt+vn+YxEFPyj9LtLH8YfUDE1HECBL9s3dPtSKXoFtPyn45ykRKEmOD/NP84sD23zNZaefkQqUCgQYEs5O3xJR9QqihagdlnS8olwgaMSyELeamaBSoUgq8WUcxMluPfWW2rf5eNXigG8DvdvsxY0jp71buh58FNjn6fiuG/7cI/oiENHzmmSiPFnwGvV68EWg2yS6+CFH+bnnrmPb8cELpBqsqpmkGCd7YmxbG51hgYu0PHhPCLXjg01NQz7wV4XdnnK6hYG7MktCqH2motqmCJ5yi1baDAP26vAE/Xz53vHY7wuvaW1kpmpgV21T5Rbd+fY/IrAgTr7WXBL9OE5a9g/fHqmCl2Oyke7u7gXeGCY9WYJFf5Gm4Jk9VtWypCmojtJaIEq/jLa2tiXSFNS1iSKERCKxodtjNFx/m5ubvfIZ/TxpBl96YtwRAvlZ9gPSDKkpil+maf6Nx+Ow6wDpwVQul1vExkGtGsqf+KH9ctirneS1J18fzEVRFYRCNlllG0ZkMV7lvqrJNqr0+IBMGEVa4jL2mlHtC2KjTn/ASccsFAqzIUk8U5wxx1jbtlNnPUXpojwR9WytElFxG8RjN4YC5I7Djq0psBLLumlUR1lfK0hZHyhaH75WYFr5wMTEGcIwtfTytYJ/ZSjcE3Q00awAAAAASUVORK5CYII=';

export const APP_ICON_2 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOYSURBVHgB3ZtNTxNRFIZPp4MmJDbFEBMzjZS4URemYeHKBUbjVnHnBjX+AN0ZV9AVcSc/ARa6BLeCkYVuMBESEtEVpUUlgcAwjYhhSj3vZO6kLaWfh2TmPgnc+bid9p1z7rkfcyZGbZBmDg8Ph2OxWJr/BsrlchKH/ZIMw0iq7U7h69pHR0e2v51TJV93ncvleDy+nGNavl6zCqwp6bruM/6CxxBGIcAXPstiJ5uJPVGgEsab4xRuxjc2NrInnawrEK5YKpU+stXSFAFgUbbmrXrWNGoPsLZMlMQB/Fb8ZsuyMrXnqiwYNcvVUs+SVRaMsjigLIn4oY4FAlOp1FiUxSmggYPjc7XvuShckw+ukUaYptnHnmp7FqxUrAtKkyeQG+c90gzW9MgrdXRPBbvpoMFRJ0OawtqGDY462gpERDXCMoA+DTDjgQUHSFNYW59JXXB9Jku9Vy8F+7+n3tP6xFsKEZ4F09QhZ1L9VfsXHtykMMEumuzKgiv3xyhx4wqZiV4aePmQ4ud6KWwYWGagDvn3c5u2Zj7RzvzX4NhZq5/CApZPzG7XUACEKi5PPCUJNqfnqm5ch3TnopW4xX0y2UXhshLsrxYkBB6f0XdKydknSfa+fCcJxARWuqkExcWQCSwV5SzosDhXyCPEBLrOX5Jia+YzSRFKF3WE3BPIWVDIRf+s5kVvVuiiaHHxB0kSuiCz86H7vq+SULVBXEOy/QExgRJtZ3d+iaQREwi+jb7qWCS6htzEG5ImxivaZRKm3RkF2q8rPNRTiA22a2nVkphLYh4ZGYHXpl94MwoIbOaysDTqo0S9lZExcaFYVbNJiPN3hoLpEn70xdG7DevjvHJnlH23h0gY21AP/CWovfvNRjcHv7bbqt8uMJ5oFEUftjk1F2xjOaMR23x+lzt2CMPndudlO3mAKIrOR9fV7QVD5aLoClx0jzQFxsPCb440BdlRWgtE6pfR09OzQJqCvDYvCcGyrDXdHqOh/RUKhUH1jH6KNIOb3juUnkB+lv2aNENpiuOfbdsHiUQC7jpMepDN5/Oz2Ahy1ZD+xA/tl6Ke7aTantoPxqLICkIiW5RHNioZr/JY1WAbWXpcYSSKIn1xI7U5o9onxMbrfYCDju04zmREAk+WI+YT1rZZ72QrSeleeiLy2cJiUQwv0XejK0DsaFS3qcBKfNfNIDvKf60g7X+hV57CawW2Hw9sDJwhDEPLdl4r+A8KVOawXXRhqAAAAABJRU5ErkJggg==';

export const APP_ICON_3 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANASURBVHgB7Zs7iBNBGMe/3U04ODDkQAtJYjZY+AAhlQgixMb2TGvhKbYR7QQbk+paD9NLbCw9Wy20uMrGKwQ9m8slEQ8U3IsYlLz8/sNOSJZd83A3ZIf84G6ys4/kz/fYmZ1vNZoCk2m32zlN00z+S/f7/Ti67ZZ0XY/Lz7PC17V6vZ5lf67Klq97wO2uYRi7VWbi6407gDXFO53OPf6CWxBGC4AtfJvFbo0T6ylQCuOPRVpsio1Go+S101UgXLHb7b5hq5kUAmBRtuZVN2vqzg7Wlg2TOIDfit+cSCSyzn0jFgyb5Zy4WXLEgmEWB6QlkT9k30BgMpl8FGZxEmjg5HhfbgsXhWty5z4pRCQSWWNPtYQFhxWrgtQkBHJwrpNisKYN0aronhJ204zOWSdLisLacjpnHWUFIqPqizKADgLMeGDBNCkKa1vTSW2EBU1SFHbR+NwsuJI4TuefPaBLn56KFtvzQEulUj/+9zHDOFbPnaIz5bsjov58+U6fC0/o18caBYil8SC7TwFyIn+Z0g9vUOTYquv+g83n9LXyioLCiMViRQqIZGGdTBanr0Q9j4lfuSDa5rs9CoJABEZiq5Qp3qSTG9cmOj528SwZbOGjnQ/kN767KOIM8Ya4m5YWx+MexyXi0y98zaIyU84iDuA8vzOsrwKdmXIWcP7pzTvkF74KnNVyThCTfqH6UG0pMPREaE50frao22wNtg2+V3qNbvxkbgIPK6+pUd4ebCcL18VIJ2iWMRh2lgLDDp6qWaQuli4X/P2gUX7p2o/ZwbcXOyN92PaaNXhdZ1pgPI1XRfdVfTaKBVGlXZSfNQmBVVIYZNEjUhThojAjKQqqo5QWiNIvPRqNviVFQV2bKEJQ8VaB+KvX6xm5Rl8hxeDQE6MFIZDXsh+TYkhNBv5ZlvWbn3DDXXOkBqVarSZm14NaNZQ/8aL9+7CvF8rYk9uD6RKqglDIFuaRjSzGG+4bmQ+iSo8PyIdRpC0u76wZVb4g1nA7gZOO1Ww2t0KSeEqcMW+ztkO3nZMUpYvyRNSzLYpFMbzEvRu3AuSOfx07VuAwtutmUR1lv1Zg2l8o2gBeK7DsfGBh4AxhGFpO81rBX/TIhQUas1AlAAAAAElFTkSuQmCC';

export const APP_ICON_4 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMASURBVHgB7Zu/b9NAFMdfHEdIkYhSBBKSE+puhSkwMDEEgVirjEyFHQkWhJhopg4s9E8IA4yUFVTBwJ7+B02TICqBVBOkCpRfvO/JFzmRS9r6KnxP/UjpXWzXyTfv3fPz3XOGjoHP9Pv9aiaT8fm1OB6Pi9gctuQ4TlH3TwqfNxiNRkHYb+mWz7vL7XY2m91uMUc+37wDWFNxMBg85g94AGGUAkLhmyx2Y57YQwVqYdxdo3Sz1u1264ftjBUIVxwOh5/Yaj5ZACzK1rwdZ01ndgNrq9gkDuC74jt7nleZ3TdlQdssN0ucJacsaLM4oC2J+KG3TQSWSqUXNovTQAMHxyf6vXJRuCZv3CFBuK67wJ4aKAtGFUtBa1ICeXCukDBY06pqJbqnht10yeGoUyGhsLaqw1FHrEBEVCctCfRpgDseWHCRhMLaFhySjbKgT0JhFy1KtyBmGZxEUwxpBtMnbtI5lOtbL+mcd5FMsLv+lr41PpBBkruoKXEgv1wm08gfg5RCSo9W6FLtFpnAJUM07zylP19/qP7l1XvkP79PJ6Vwc1m9vr/7QkkxZkEtDgx7B5QWjFkQv3hc/39jTOC1188ojZxFUds5E2g7iYPMXuMj5a+aSbH2t5pkmsQCW+tvKM0Yu0yAC3dvcMJ8hZLgns8bvY4aFQhxyCNNEM2MkpApl8v7Se8Jo5i6fRr+OqBB8pQvcLHgj7kLMoSpX94EKGiQfx2EShIKD72Wo2tRpAIX/UlCgfEw8dsioaA6SrRAlH45uVzuMwkFdW2qCMHzvB1py2gYf51OZ0mv0TdIGDz03qNVAnkt+xUJQ2vK4k8QBL8LhQLctUoyqLfb7U10JrVqKH/iRfum7euFeuzp95NcFFVBKGSzObPRxXjRbVPJNqr0+ICajSJDcbXZmlHxBbHZuH/goBP0er0NSwJPnSPmQ9a2F7fzKEXpqjwR9WxpsSjSS1y7cSlA7PjXsXMFRgldt4LqqPCxAj/8QNWewmMFQRgPAiTOEIbU8jiPFfwFbMlpaO1dAOcAAAAASUVORK5CYII=';

export const APP_ICON_5 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOOSURBVHgB7ZtBTxNBFMffbgsaiE1L4GDaQomJ4q0S40UPGIlX0y+AGo/G6DcQTsabGPkA8AEEriDRg1w0EU6KJ7BUbUIDawmNSAu+/8tOU5pCC7sknUn/yTLb2dnt/nhvZt903lp0AiVYe3t7Q5ZlJXjrOzg4CKPaLcm27bDaP634us7+/r7j7q+pkq/7g8vlQCCwvMZq+Hr1GjBTuFgsPuUveAAwagK54DMMO14P9khABca7o9TcGs1kMmNHHawJCFcslUrv2WoJ0kCwKFvzdi1r2tUVzJbUCQ7CveKeo9FosvrYIQvqZrlq1bLkIQvqDAcpS2L8UHVlwFgs9lxnOCUw8OD4TH0WF4VrcuUqGaRgMBhhT3XEgpXEpkgxCSB3zntkmJjpvpQmuqcSu2m/zaNOkgwVsw3ZPOoYC4gR1W6WAPoshBkPLNhHhorZIjaZLbFgggwVu2jYdAtS0P2ZgbwqdGOAuu4McnmF2mPdFLzQIfWFb2na/ZWjzXdLtLXwReq6U7eocyAu55yLdktdcbtA/zI52llJU3Zqnnb4PK/CzycWB9me6Xr4hi+9eFS33deRlwLUaNv8pxXyKl9cFJbwW35d0/g+2ALUXS1A3dUC1F0tQN1lfrBNPgnBcnZyXuLH3Z852RB3YkPY1ZO6WW6LNhvTixJYl/IFKvG57dzuPG8RDtgjw9fIL/kSbHdc7ZVZQzDUITC4WcwmAI36AoMUGQTHUUIKvHI2sc3gmEWoOvyTvMoXC8IKlyeeyA2raVK1NqY/UubNrFgI1jwqmAZUdmpOpld+yBcLXv88IWXu7SJt8pyv2kUxnYLbKXgcg4uibaWLdg70luG3Fpbo++PX5FVWPB7f8rqu3jU8KK51nEsB9OLIXZn8/p6cO/Z6yro+zAcdixcNV0396RDrheY/B5G2QYaKu96arXJRTBVc9A8ZKumDMCMZKmRHGQ2I1C+7ra3tAxkq5LVJEoKJz0L0v/X19X61Rj9Jhom73ixKAeS17FdkmBRTAH8cx/kbCoXgrkNkhsbS6fQMdsq5akh/4kX7Jd3XC1XfU5/LsSiygpDIpnNko5LxKusOBdvI0uMGKR0hXbhUdc6o8QmxgVon8KDj5PP5cU0GnjEeMR8yW7bWwUaS0iU9EflszWJRhJd4duNRgLHjuLZ1ASvlum4S2VHuawUJ9wulPIPXChx3PHAQOAMMoeVJXiv4D3e43v9mpzVBAAAAAElFTkSuQmCC';

export const APP_ICON_6 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPeSURBVHgB3ZtNTBNBFMdft22MNbTFcBBbpHAQ9NSYyBnjR0w8AEcvVmPiRYxejNGLcJF4k8jVBDzITfBsiB7wwkE4GL8SpZSqJBDd1EiAfvn+6w5py1Ja2Knd+SXL7s5Ot/3z3sy8nXnroiqIMOl0utvlckV4a83n80EUm3vSNC0ojncL31fP5XK6eRwXe77vAu/n3G73XJyp+H47VWBNwUwmc5O/4DKEUR1gCp9kscM7id1WoBDGhwNU3wwkk8nB7S5aCoQrZrPZV2y1CDkAWJStecrKmlppAWuLOkkcwG/Fbw6FQtHSa0UWdJrlSrGyZJEFnSwOCEui/xBlmwLD4fB9J4sTQAN3jrfEueGicE0unCeF8Hg8jeypumHBQsWqIDQZArlx9pBisKaYsVfRPQXspm0a9zpRUhTW1q1xr6OsQPSoWr0E0DLAEw8s2EqKwtoaNfpPHDh2xNgk0+qBn7IpqZaE+3t46zWOkyOTvL0gGbCuYM0tWCju33kvefw+koWGaQaqEQfPnCgSB7K/VymTWiUZYPpE2+scSqX4uL21D13dUv7nQ4IkUhsX3Rdqoo6RG+Rp2OqKv6ZmSSbSBULc8ad3jL0VqZmPJBOpAtF5lBOH9ifZReUKPMpuuZ04kJr5RLKRJjBy9yL5uzrL1pHtnsDt9/sHyGYw1h2+dmHHet6mAOU3MrTxfYVy62mSgYvnYvJkIxjr4JrVkOG2uPx8mhaGxslubHdRX2f18SWGj+bYOWOzG9sF/px6S7vF3WB/yGa7wFXu9mdP36bliTe0/m2l4s+h7vLENNmN7W2wEIyD4eu9dCh2tmw9tMH3lx4a/xy7kToOVhpELzwYlyIOSA/V/F0dZa/jWVCGawqkh2q+Mk/tEIcHXplIFVguklkaeyldHMCsmk6S8J+0FogQLT70jGqArokFfxlYtT8MB5/7H1MtgPGkuahV+4M4DAeypiiskOaiEIHxTSDEVTP47xWejom7A4HAeT7uJAno0+9of3uzIerLvSe09vUH1Zi4q6WlZZSVxkhB2DtHMasWJ0VBdpTSApH6pXm93tekKMhrMxYlQqHQvGrLaMiZWVxcbBNr9GOkGNz0jBUdQyCvZT8ixRCa3Pij6/oaz67BXbtJDQYTiYQRyW8uDCL9iRftZ52e7STanjjfjEWRFYRENpFl60REMl5hWVGwjSw9rtDnRJGmuL7SnFHlE2LdVh/gTkdPpVLDDul4BrnHvMLalqwuVpKUbqQnIp+tXiyK8BJjN4YC9B3l6laVXmG6bhTZUeZrBRHzC429hNcKdLM/0BE4QxhCy2peK/gLwGjZen2D4NIAAAAASUVORK5CYII=';

export const APP_ICON_7 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMOSURBVHgB7Zu/b9NAFMdfbHcJIkorZXJEUiYYkAIDSxmCYEdhZAHEigRrJ5qpK/0DEGJibNmRYGBigG6wQNMkSEggMEYKRfnV9z35oiZy2jg9R76TP1Jy9vlH/M17frbfPWcoAmWm2+1WM5lMmT+l4XCYR3fQkmVZeTk9L7xfbzAYeMF0Q7a8331ud23b3m0wM+/vpBVYU77X6z3iH7gHYZQAAuE7LHbrJLFTBUphPLlByWaj3W7Xpy0MFQhX7Pf7b9hqZdIAWJSteT3MmtZkB2ur6CQO4FhxzK7rViaXjVlQN8tNEmbJMQvqLA5ISyJ+yL6RwGKx+ERncRJo4OD4WM4LF4VrcuceGYTjOMvsqZ6w4FHFpiA1CYF8ct4iw2BNd0VrontK2E1XLY46FTIU1la1OOoYKxAR1UrKDXQc4IkHFiyRobC2ZYcU4+SydH7zAeWuXiDnbDbStj+239H+5kvq+R1SRMmBn7IpSRWl9Tu0cuMKzUOhdk20X9afkQpYV94ixRRqa3QaVm7O9+dMw0KagRKEHdGtjwPpE+u0OZSEo95Fk0YqUHdSgbqTCtSdVKDupAJ1JxWoO6lA3UFWzSNz8RwM+CN3QTHT+9uhr5xrOfj2U+Rsig/jHy2A8ZRn1abx+/UH+sUf0PnUZJGXKXvxHMXNwly07/8bm4dF44bTMQ1L1qLETeH2Gp0JLAb3RN50EcBF/5BC/PefQw8e2bJL2/WZtlcFjIesWoMUgqTtfw4k84DtVCV9gaiOcl0XFUzPSTEIIFFS9xA37x8zDdZVM34AVAxKsBX3TBtGw/nXarVW5Rj9CzIMPv9eoRUC2ZRPyTCkJhtfnucd5HI5uGuVzKDebDZ3MDEaGET5Ew/af9S92kmee3J+9LiEqiAUsi3qziYOZDHe0b6x50FU6fEKNR1FBuJqkzWjxhfE2mEbcNDxfN/f0iTw1Dli3mdt38MWzlKULsoTUc+WFIvi/hnXblwKEDuOWzdSeUXguhVURwWvFZSDHxRtDK8VeEE88HDjDGFLS0tvo7xWcAgFtHXsoO9ExAAAAABJRU5ErkJggg==';

export const APP_ICON_8 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARWSURBVHgB3ZtBTBNBFIZft9sYMTat0cQEAiUcQA8GOBATPWDAs3L0IhK9gdGLMXoRLhJjYkS4GiMHuZiAd4geNDEehHhQOBBKwcREImtRlNCC7x92mu12oWBnSXe+pGy7O7T7971582bmNUR7IMGsr6+3hkKhBD9qNjc3YzhtH8kwjJh8/r/w+1obGxuW/Twpj/y+83ycCofDU0lm1+9XrAFrimUymRv8AVcgjMoAW/gYix0oJnZbgVIYP+2l8qZ3cXGxb7uLngLhitls9jVbLUEBABZla57zsqbhPsHaGoMkDuBecc+VlZWN7mt5Fgya5dx4WTLPgkEWB6QlET/kuZzAqqqqe0EWJ4EGDo435WvhonBNPjlHGmGaZpw91RIWdCrWBalJCOTOeYE0gzV1iqOO7ilhN601OOo0kqawtlaDo462AhFRjXJJoP0AMx5YsIY0hbXFDdIbYcEEaQq7aMwkRRyoPEp1/Vcp2tJQcG154iMl74/Q2telom1Xv6Ropmcw17ZUTHuZgUqlfug6VZyopu+jb/POh6MVdKStmcKHK+jz5QfiXFXPRSEOwjPp1YK2EC/blgKWT8xS11AkELc8MUmzd54WXDs12iesJom21FP6wzTNdA8WtK3rv0bHOs6QItS5KMikf4vjsY6zQgQE/xhnK62sCut4caS9meJtTSx4psD6KvAlisL9ILKiobpoW7SRX4gfKLWgBH0LQQJuWAy0WRzi4DKdIj9QKtC03RBuicdOIOgACHR+EWb0ICm9J1IEbjLOEfDk8O38D2Ah7ui6PD5JxzvPb9sWHqCKcDQa7SUFIEiY0UN0iG8QlpQP40CElkbf0cKjl7Sxti7a/vo0S5GjMc+2cNW53mHKrqySCkK8FlP6IFjG6J6LkvJUzTmgS9A/5/tHclkL+p5sh4xFpmVNEw9z/zPZdotUoExgzd1LYvxDLplx9R+Mc9n0H0r2vxCvIc7ri/A6VyrKBCKHROYy0/2k4BpStXh7U07gfuJLqob0CxmKHOPcqZozkXa6tSq3dOJLJoPxEAkzMhSvbMY5FXK6q6opkhNfBG6J2vQt/doLvghE1rLTzADR0umW0nKnp5/l2rxv6CIVmNgTVzEnhNUQLZGRuCexiK5+TIV2gWViwx9rF1QimOhiVo/+52ZrxvCK9hsYL8S7onO6ro1iQxQLvxZpCnc9ITBJGoNk+ydpinBRmJE0BdVRWgtE6ZcRiUTekKagrk0UIeg4VKD/LSws1Mo9+uekGdz1RGYhBPJe9mPSDKkpjD+WZf3l1TW4ayvpQV8qlRrDk1ytGsqfeNN+Muj7hbLvyde5VTVUBaGQLciZjSzGc57LWzZElR436AiiSFtch7tmVPuC2LDXP3DQsdLp9EBAAk8fR8wu1vbN6+JuitJFeSLq2crFokgvMXZjKEDs2KltUYFObNdtRHWU/bOChP2B4ujDzwosOx5gWWUewpBa7uVnBf8AHQgseEwehBcAAAAASUVORK5CYII=';